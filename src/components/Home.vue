<template>
  <div id="home">
      <section>
        <div class="hero hero-body is-dark">
            <div class="container">
                <h1 class="title">{{ title }}</h1>
                <h2 class="subtitle">{{ subtitle }}</h2>
                <form id="zipform" v-on:submit="GetLocationInfo">
                    <div class="field">
                        <div class="control has-icons-left has-icons-right">
                            <input class="input is-large" id="zipinput" type="text" placeholder="Enter Zipcode" v-model="userInput">
                            <span class="icon is-small is-left">
                                <i class="fa fa-map-pin"></i>
                            </span>
                        </div>
                    </div>
                </form>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
            <div id="output">
                <div v-if="notification" v-bind:class="notification.cssClass" class="notification is-danger">
                    <button v-on:click="DeleteNotification" class="delete"></button>
                    {{ notification.message }}
                </div>
                <div v-if="results" v-for="place in results.places" :key="place.name" class="message">
                    <div class="message-header">
                        <p>Location Info</p>
                    </div>
                    <div class="message-body">
                        <ul>
                            <li><strong>City: </strong>{{ place['place name'] }}</li>
                            <li><strong>State: </strong>{{ place['state'] }}</li>
                            <li><strong>Longitude: </strong>{{ place['longitude'] }}</li>
                            <li><strong>Latitude: </strong>{{ place['latitude'] }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      </section>
  </div>
</template>

<script>
export default {
  data() {
      return {
          title: 'US Location Info',
          subtitle: 'Enter a zipcode to get the location info',
          contry: 'us',
          userInput: null,
          notification: null,
          results: []
      }
  },
  methods: {
      ShowNotification(message, cssClass) {
        this.notification = { message, cssClass };
      },
      DeleteNotification() {
          this.notification = null;
      },
      GetLocationInfo(e) {
        e.preventDefault(); 

        // Clear data and notification.
        this.results = [];
        this.notification = null;

        // Set local variables to user inputs
        let country = this.contry;
        let zip = this.userInput;

        // Check for required information
        if (!zip || !country) {
            this.ShowNotification('Please enter something.', 'is-danger');
            return false;
        } 
        else {
            // Make request
            fetch(`http://zippopotam.us/${country}/${zip}`)
                .then(response => {
                    if (response.status != 200) {
                        // Show error message
                        this.ShowNotification('Invalid zipcode, please try again.', 'is-danger');
                    } 
                    else {
                        // Return data in JSON format / as JSON object
                        return response.json();
                    }
                })
                .then(data => {
                    // Load data
                    if (data) {
                        this.results = data;
                    }
                })
                .catch(error => {
                    // Show error message
                    this.ShowNotification(error.message, 'is-danger');
                });
        }
      }
  }
}
</script>

<style scoped>
    .icon-remove, .icon-check {
        display: none;
    }
    #output {
        padding: 20px;
    }
</style>
