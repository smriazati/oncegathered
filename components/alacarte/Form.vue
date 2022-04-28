<template>
  <form
    name="alacarte"
    method="POST"
    data-netlify="true"
    :action="successRoute"
    class="alacarte"
    enctype="multipart-form/data"
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
        <input
          type="text"
          name="person1name"
          v-model="person1nameInput"
          required
        />
        <div v-if="person1nameError" class="error">{{ errorMsg }}</div>
      </div>
      <div class="form-group">
        <label for="person1pronouns">Person 1 Pronouns</label>
        <input
          type="text"
          name="person1pronouns"
          v-model="person1pronounsInput"
        />
      </div>
      <div class="form-group">
        <label for="person2name">Person 2 Name *</label>
        <input
          type="text"
          name="person2name"
          v-model="person2nameInput"
          required
        />
        <div v-if="person2nameError" class="error">{{ errorMsg }}</div>
      </div>
      <div class="form-group">
        <label for="person2pronouns">Person 2 Pronouns</label>
        <input
          type="text"
          name="person2pronouns"
          v-model="person2pronounsInput"
        />
      </div>

      <div class="form-group flex-col full-on-sm-screen">
        <label for="email">Email Address *</label>
        <input type="text" name="email" v-model="emailInput" required />
        <div v-if="emailError" class="error">{{ errorMsg }}</div>
      </div>

      <div class="form-group flex-col full-on-sm-screen">
        <label for="phone">Phone Number *</label>
        <input type="text" name="phone" v-model="phoneInput" required />
        <div v-if="phoneError" class="error">{{ errorMsg }}</div>
      </div>

      <div class="form-group flex-col">
        <label for="date">Wedding Date *</label>
        <input type="date" name="date" v-model="dateInput" required />
        <div v-if="dateError" class="error">{{ errorMsg }}</div>
      </div>

      <div class="form-group flex-col">
        <label for="location">Wedding Location *</label>
        <input type="text" name="location" v-model="locationInput" required />
        <div v-if="locationError" class="error">{{ errorMsg }}</div>
      </div>

      <div class="form-group flex-col">
        <label for="planner">Planner</label>
        <input type="text" name="planner" v-model="plannerInput" />
      </div>

      <div class="form-group flex-col">
        <label for="colors">Color Palette</label>
        <input type="text" name="colors" v-model="colorsInput" />
      </div>

      <div class="form-group flex-col full-on-sm-screen">
        <label for="style">Describe The Style Bouquet You Would Like</label>
        <textarea type="text" name="style" v-model="styleInput" />
      </div>

      <div class="form-group flex-col full-on-sm-screen">
        <label for="convey"
          >What Would You Like To Convey To Guests Through Your Wedding
          Flowers</label
        >
        <textarea type="text" name="convey" v-model="conveyInput" />
      </div>

      <div class="form-group flex-col full-on-sm-screen">
        <label for="pinterest">URL For Pinterest Board If Applicable</label>
        <input type="text" name="pinterest" v-model="pinterestInput" />
      </div>

      <div class="form-group flex-col full-on-sm-screen">
        <label for="referral">How Did You Hear About Us?</label>
        <input type="text" name="referral" v-model="referralInput" />
      </div>

      <div class="form-group flex-col full-width">
        <p>
          List specific flowers needs for your wedding and approximate number of
          each
        </p>
        <div class="product-list">
          <div
            v-for="(item, index) in productList"
            :key="index"
            class="product-list-item"
          >
            <label :for="item">{{ item }} </label>
            <input type="number" :name="item" min="0" />
          </div>
        </div>
      </div>

      <div class="form-group full-width file-upload">
        <label for="inspiration" class="custom-file-upload">
          Upload 2-3 photos of inspiration below
          <input
            id="inspiration"
            name="inspiration"
            type="file"
            v-on:change="handleAttachment"
          />
        </label>
        <p class="small">Limit of one file, max 8mb</p>
      </div>

      <div class="form-group flex-col full-width full-on-sm-screen">
        <label for="notes">Additional Notes</label>
        <textarea type="text" name="notes" v-model="notesInput" />
      </div>

      <!-- // submit -->
      <div class="form-group full-width">
        <button class="btn primary" type="submit" @click="checkForm">
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
  head() {
    return {
      title: "A La Carte Orders",
    };
  },
  data() {
    return {
      errorMsg: "Fill out all required fields",

      person1nameInput: null,
      person2nameInput: null,
      emailInput: null,
      phoneInput: null,
      dateInput: null,
      locationInput: null,

      person1nameError: false,
      person2nameError: false,
      emailError: false,
      phoneError: false,
      dateError: false,
      locationError: false,

      person1pronounsInput: null,
      person2pronounsInput: null,
      plannerInput: null,
      colorsInput: null,
      styleInput: null,
      conveyInput: null,
      pinterestInput: null,
      referralInput: null,
      notesInput: null,
      errors: [],
      fileAttachment: "",
      productList: [
        "Bride Bouquet",
        "Bridesmaid Bouquet",
        "Posy Style Bouquet",
        "Boutonniere",
        "Corsage",
        "Flower Comb",
        "Flower Crown ",
        "Modest and Petite Low and Lush",
        "Perfect Size Low and Lush",
        "Lavish Lush and Lush",
        "Bar/Welcome arrangement (Tall skinny vase)",
        "Rectangle Arrangement (perfect for long table)",
        "Garland",
        "Bud vases",
        "Petals for Aisle",
      ],
    };
  },
  methods: {
    handleAttachment(e) {
      this.fileAttachment = e.target.files[0];
    },
    clearErrors() {
      this.errors = [];
      this.person1nameError = false;
      this.person2nameError = false;
      this.emailError = false;
      this.phoneError = false;
      this.dateError = false;
      this.locationError = false;
    },
    checkForm(e) {
      this.clearErrors();
      if (!this.person1nameInput) {
        this.person1nameError = true;
        this.errors.push("Person 1 name required.");
      }
      if (!this.person2nameInput) {
        this.person2nameError = true;

        this.errors.push("Person 2 name required.");
      }

      if (!this.emailInput) {
        this.emailError = true;
        this.errors.push("Email address required.");
      } else if (!this.validateEmail(this.emailInput)) {
        this.emailError = true;
        this.errors.push("Valid email address required.");
      }

      if (!this.phoneInput) {
        this.phoneError = true;

        this.errors.push("Phone number required.");
      }

      if (!this.dateInput) {
        this.dateError = true;
        this.errors.push("Wedding date required.");
      }

      if (!this.locationInput) {
        this.locationError = true;
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
      &:nth-child(odd) {
        padding-right: 1rem;
      }
      &:not(.full-width) {
        flex: 0 0 50%;
        @media (max-width: 400px) and (orientation: portrait) {
          flex: 100%;
          padding-right: 0;
        }
      }
      &.full-width {
        flex: 100%;
      }

      @media (max-width: $collapse-bp) {
        &.full-on-sm-screen {
          flex: 100%;
          &:nth-child(odd) {
            padding-right: 0;
          }
        }
      }

      .error {
        margin-top: 8px;
        font-size: 12px;
        font-style: italic;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0em;
        @include bodyTypeface;
      }
    }
  }

  button {
    display: flex;
    justify-content: flex-start;
    align-self: flex-start;
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
      transition: 0.3s ease all;

      &:hover {
        background: $coral;
        color: $buttercream;
      }
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

  p {
    @include labelStyle;
  }
  .product-list-item {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    margin-top: 15px;

    input {
      flex: 0 0 48px;
      width: 48px;
      min-width: unset;
    }
    label {
      flex: 2;
      padding-left: 1rem;
      margin: 0;
    }
  }

  // file upload
  .file-upload {
    input[type="file"] {
      align-self: start;
      border: 0;
      padding-left: 0;
    }
    label {
      margin-bottom: 0;
    }
    p.small {
      font-size: 12px;
    }
  }
}
</style>