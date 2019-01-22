class Session {
  _id: string;
  userId: string;
  timeStamp: Date;
  constructor(id: string, userId: string, timeStamp: Date) {
    this._id = id;
    this.userId = userId;
    this.timeStamp = timeStamp;
  }
}

export default Session;