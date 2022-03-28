<template>
  <form
    name="alacarte"
    method="POST"
    data-netlify="true"
    :action="successRoute"
    enctype="application/x-www-form-urlencoded"
    class="alacarte"
    :class="hasError ? 'has-error' : 'no-error'"
  >
    <input type="hidden" name="form-name" value="alacarte" />
    <div class="form-wrapper">
      <!-- <div v-if="name" class="form-group flex-col">
      <label for="name">Name</label>
      <input
        type="text"
        name="name"
        v-model="nameInput"
      />
    </div>

    <div v-if="email" class="form-group flex-col">
      <label for="email">Email</label>
      <input
        type="text"
        name="email"
        v-model="emailInput"
      />
    </div>

    <div v-if="message" class="form-group flex-col">
      <label for="message">Message</label>
      <textarea
        name="message"
        id="message"
        v-model="messageInput"
      />
    </div>

-->

      <!-- // form fields -->

      <div class="form-group">
        <label for="person1name">Person 1 Name *</label>
        <input type="text" name="person1name" v-model="person1nameInput" required />
      </div>
      <div class="form-group">
        <label for="person1pronouns">Person 1 Pronouns</label>
        <input type="text" name="person1pronouns" v-model="person1pronounsInput" />
      </div>
      <div class="form-group">
        <label for="person2name">Person 2 Name *</label>
        <input type="text" name="person2name" v-model="person2nameInput" required />
      </div>
      <div class="form-group">
        <label for="person2pronouns">Person 2 Pronouns</label>
        <input type="text" name="person2pronouns" v-model="person2pronounsInput" />
      </div>

      <div class="form-group flex-col">
        <label for="email">Email Address *</label>
        <input type="text" name="email" v-model="emailInput" required />
      </div>

      <div class="form-group flex-col">
        <label for="phone">Phone Number *</label>
        <input type="text" name="phone" v-model="phoneInput" required />
      </div>

      <div class="form-group flex-col">
        <label for="date">Wedding Date *</label>
        <input type="date" name="date" v-model="dateInput" required />
      </div>

      <div class="form-group flex-col">
        <label for="location">Wedding Location *</label>
        <input type="text" name="location" v-model="locationInput" required />
      </div>

      <div class="form-group flex-col">
        <label for="planner">Planner</label>
        <input type="text" name="planner" v-model="plannerInput" />
      </div>

      <div class="form-group flex-col">
        <label for="colors">Color Palette</label>
        <input type="text" name="colors" v-model="colorsInput" />
      </div>

      <div class="form-group flex-col">
        <label for="style">Describe The Style Bouquet You Would Like</label>
        <textarea type="text" name="style" v-model="styleInput" />
      </div>

      <div class="form-group flex-col">
        <label for="convey"
          >What Would You Like To Convey To Guests Through Your Wedding
          Flowers</label
        >
        <textarea type="text" name="convey" v-model="conveyInput" />
      </div>

      <div class="form-group flex-col">
        <label for="pinterest">URL For Pinterest Board If Applicable</label>
        <input type="text" name="pinterest" v-model="pinterestInput" />
      </div>
      <div class="form-group flex-col">
        <label for="referral">How Did You Hear About Us?</label>
        <input type="text" name="referral" v-model="referralInput" />
      </div>

      <div class="form-group flex-col full-width">
        <label for="notes">Additional Notes</label>
        <textarea type="text" name="notes" v-model="notesInput" />
      </div>

      <!-- // submit -->
      <div class="form-group full-width" @click="checkForm">
        <button class="btn primary" type="submit">
          <span>Send</span>
        </button>
      </div>

      <div v-if="errors.length > 0" class="form-group error-group">
        <div v-for="(item, index) in errors" :key="index">
          <p>{{ item }}</p>
        </div>
          <!-- Please fill out all required fields marked with an asterisk (*). -->
          
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    successRoute: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      emailInput: null,
      person1nameInput: null,
      person1pronounsInput: null,
      person2nameInput: null,
      person2pronounsInput: null,
      phoneInput: null,
      dateInput: null,
      locationInput: null,
      plannerInput: null,
      colorsInput: null,
      styleInput: null,
      conveyInput: null,
      pinterestInput: null,
      referralInput: null,
      notesInput: null,
      hasError: false,
      errors: [],
    };
  },
  methods: {
    checkForm(e) {
      this.errors = [];

      if (!this.person1nameInput) {
        this.errors.push("Person 1 name required.");
      }
      if (!this.person2nameInput) {
        this.errors.push("Person 2 name required.");
      }

      if (!this.emailInput) {
        this.errors.push("Email address required.");
      } else if (!this.validateEmail(this.emailInput)) {
        this.errors.push("Valid email address required.");
      }

      if (!this.phoneInput) {
        this.errors.push("Phone number required.");
      }

      if (!this.dateInput) {
        this.errors.push("Wedding date required.");
      }

      if (!this.locationInput) {
        this.errors.push("Wedding location required.");
      }

      if (!this.errors.length) {
        return true;
      }

      e.preventDefault();
    },
    validateEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>


<style lang="scss">
form.alacarte {
  background: $buttercream;
  .form-wrapper {
    @include baseContainer;
    display: flex;
    flex-wrap: wrap;
    padding: 90px 0;
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 2rem;
      label {
        //styleName: label;
        @include bodyTypeface;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 18px;
        letter-spacing: 0em;
        margin-bottom: 0.8rem;
      }
      input,
      textarea {
        border-radius: 0;
        outline: 0;
        border: 1px solid $charcoal;
        padding: 8px;
      }
      input {
        height: 48px;
      }
    }

    .form-group:nth-child(odd) {
      padding-right: 1rem;
    }

    .form-group:not(.full-width) {
      flex: 0 0 50%;
    }
    .form-group.full-width {
      flex: 100%;
    }
  }

  button {
    display: flex;
    justify-content: flex-start;
    span {
      background: $forest;
      @include bodyTypeface;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0em;
      color: $buttercream;
      padding: 8px 16px;
    }

    &:disabled {
      span {
        background: $charcoal;
        &:hover {
          cursor: default;
        }
      }
    }
  }

  .error-group {
    @include bodyTypeface;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    margin-bottom: 0.8rem;
  }
}
</style>