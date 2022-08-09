<template>
  <v-dialog max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" class="success">Add New Project</v-btn>
    </template>

    <v-card>
      <v-card-title>
        <h2>Add a new project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            :rules="inputRules"
            label="title"
            v-model="title"
            prepend-icon="folder"
          ></v-text-field>
          <v-textarea
            :rules="inputRules"
            label="information"
            v-model="content"
            prepend-icon="edit"
          ></v-textarea>

          <v-flex row>
            <v-col cols="12" sm="6" md="4">
              <v-menu max-width="290">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    :rules="inputRules"
                    :value="formattedDate"
                    label="Due date"
                    prepend-icon="mdi-calendar-range"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="due"></v-date-picker>
              </v-menu>
            </v-col>

            <v-spacer />

            <v-btn text class="success mx-0 mt-6" v-on:click="submit"
              >add project</v-btn
            >
          </v-flex>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import db from '@/fb'

export default {
  name: "Popup",
  data() {
    return {
      title: "",
      content: "",
      due: null,
      menu2: false,
      inputRules: [
        (v) => (v && v.length >= 3) || "Minimum length is 3 characters",
      ],
    };
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        let correct_date = format(parseISO(this.due), "do MMM yyyy")
        console.log(this.title, this.content, correct_date);
        //writeData(this.title, "Code Jedai", format(parseISO(this.due), "do MMM yyyy"), 'ongoing', this.content)
        const project = {
            title: this.title,
            content: this.content,
            due: correct_date,
            person: "Code Jedai",
            status: 'ongoing'
        }
        db.collection('projects').add(project).then(() => {
            console.log('added to firebase')
        })
      }
    },
  },
  computed: {
    formattedDate() {
      return this.due ? format(parseISO(this.due), "do MMM yyyy") : "";
    },
  },
};
</script>

<style>
</style>