import { requests } from "../config/mongoCollections.js";
import { ObjectId } from "mongodb";
import users from "./users.js";

let exportedMethods = {
  async addRequest(senderId, receiverId) {
    //check that given ID are valid objectIDs
    if (!senderId || !receiverId)
      throw new Error("senderId or receiverId null");

    if (!ObjectId.isValid(senderId) || !ObjectId.isValid(receiverId))
      throw new Error("Invalid user inputs");

    //check that sender and receiver are not the same
    if (senderId === receiverId)
      throw new Error("Sender and receiver are the same");

    //check that sender and receiver exist
    try {
      let sender = await users.getUserById(senderId);
      let receiver = await users.getUserById(receiverId);

      //check that sener and reciever are not already friends

      let senderfriends = [];
      let receiverfriends = [];
      for (const friend of sender.friendsList) {
        let FriendUsername = await users.getUserById(friend.toString());
        senderfriends.push(FriendUsername.username);
      }
      for (const friend of receiver.friendsList) {
        let FriendUsername = await users.getUserById(friend.toString());
        receiverfriends.push(FriendUsername.username);
      }
      if (
        senderfriends.includes(receiver.username) ||
        receiverfriends.includes(sender.username)
      )
        throw new Error("Sender and receiver are already friends");

      //check if request already exists, if it is pending then throw error saying it is pending and if it is accepted then throw error saying they are already friends
      let requestCollection = await requests();
      let testRequest = await requestCollection.findOne({
        sender: senderId,
        receiver: receiverId,
      });
      if (testRequest) {
        if (testRequest.status === "pending")
          throw new Error("Request already pending");
        if (testRequest.status === "accepted")
          throw new Error("Sender and receiver are already friends");
      }

      //create new request object
      let newRequest = {
        sender: senderId,
        receiver: receiverId,
        status: "pending",
        dateSent: new Date().toLocaleDateString(),
        timeSent: new Date().toLocaleTimeString(),
      };
      //Add new result to database
      const insertInfo = await requestCollection.insertOne(newRequest);
      if (insertInfo.insertedId === 0) throw "Could not add result";
      return 1;
    } catch (error) {
      throw new Error(error);
    }
  },
  async getPendingRequestsbyRecieverId(receiverId) {
    //check that given ID are valid objectIDs
    if (!receiverId) throw new Error("SenderId null");

    if (!ObjectId.isValid(receiverId)) throw new Error("Invalid user inputs");

    //check that sender exists
    try {
      let receiver = await users.getUserById(receiverId);

      //get pending requests
      const requestCollection = await requests();

      const pendingRequests = await requestCollection
        .find({ receiver: receiverId, status: "pending" })
        .toArray();
      let pendingRequestUsers = [];

      for (const request of pendingRequests) {
        let user = await users.getUserById(request.sender);
        let RequestdUserObject = {
          username: user.username,
          userId: request.sender,
        };
        pendingRequestUsers.push(RequestdUserObject);
      }

      return pendingRequestUsers;
    } catch (error) {
      throw new Error(error);
    }
  },

  async acceptFriendRequest(senderId, receiverId) {
    //check that given ID are valid objectIDs
    if (!senderId || !receiverId)
      throw new Error("senderId or receiverId null");

    if (!ObjectId.isValid(senderId) || !ObjectId.isValid(receiverId))
      throw new Error("Invalid user inputs");

    //check that sender and receiver are not the same
    if (senderId === receiverId)
      throw new Error("Sender and receiver are the same");

    //check that sender and receiver exist
    let sender = await users.getUserById(senderId);
    let receiver = await users.getUserById(receiverId);
    //check that sender and receiver are not friends
    if (sender.friendsList.includes(receiverId))
      throw new Error("Sender and receiver are already friends");

    //get request
    const requestCollection = await requests();
    const request = await requestCollection.findOne({
      sender: senderId,
      receiver: receiverId,
    });
    if (!request) throw new Error("Request does not exist");

    //update user friends list
    try {
      await users.updateUser(receiver.username, "FriendsList", sender.username);
      await users.updateUser(sender.username, "FriendsList", receiver.username);

      await requestCollection.findOneAndDelete({
        sender: senderId,
        receiver: receiverId,
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
export default exportedMethods;
