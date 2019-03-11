<template>
  <div class="view-profile container">
    <div v-if="profile" class="card">
      <h2 class="deep-purple-text center">{{ profile.alias }}'s Wall</h2>
      <ul class="comments collection">
        <li v-for="(comment, index) in comments" :key="index">
          <div class="deep-purple-text">By: {{ comment.from }}</div>
          <div class="grey-text text-darken-2">{{ comment.content }}</div>
        </li>
      </ul>
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input type="text" name="comment" v-model="newComment">
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form>
    </div>
    <div v-if="!profile">
      <h2>Loading.....</h2>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
  name: 'ViewProfile',
  data() {
    return {
      comments: [],
      newComment: null,
      user: null,
      profile: null,
      feedback: null,
    }
  },
  methods: {
    addComment() {
      if (this.newComment) {
        this.feedback = null
        db.collection('comments')
          .add({
            to: this.$route.params.id,
            from: this.user.alias,
            content: this.newComment,
            time: Date.now(),
          })
          .then(() => {
            this.newComment = null
          })
      } else {
        this.feedback = 'Please enter a comment to add it'
      }
    },
  },
  created() {
    const userCollection = db.collection('users')
    const commentCollection = db.collection('comments')

    userCollection
      .where('user_id', '==', firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log('xxx doc', doc.data)
          this.user = doc.data()
          this.user.id = doc.id
        })
        console.log('xxx user', this.user)
      })

    // profile
    userCollection
      .doc(this.$route.params.id)
      .get()
      .then(user => {
        this.profile = user.data()
      })

    // comments
    commentCollection
      .where('to', '==', this.$route.params.id)
      .onSnapshot(snapshot => {
        // watches for db changes realtime
        console.log('xxx changes', snapshot.docChanges())
        snapshot.docChanges().forEach(change => {
          if (change.type == 'added') {
            this.comments.unshift({
              from: change.doc.data().from,
              content: change.doc.data().content,
              time: change.doc.data().time,
            })
          }
        })
      })
  },
}
</script>

<style>
.view-profile .card {
  padding: 20px;
  margin-top: 60px;
}
.view-profile h2 {
  font-size: 2em;
  margin-top: 0;
}
.view-profile li {
  padding: 10px;
  border-bottom: 2px solid #eee;
}
</style>