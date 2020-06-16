class Storage {
  constructor() {
    this.locationID;

    this.defaultLocationID = 7531926;
  }

  getLocationData() {
    if (localStorage.getItem("locationID") === null) {
      this.locationID = this.defaultLocationID;
    } else {
      this.locationID = localStorage.getItem("locationID");
    }

    return {
      locationID: this.locationID,
    };
  }

  setLocationData(locationID) {
    localStorage.setItem("locationID", locationID);
  }
}
