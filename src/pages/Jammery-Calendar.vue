<template>
<Layout>
  <div>
    <datetime v-model="date"></datetime>

    <ul>
      <li v-for="event in filteredList" :key="event.id">
        <p v-html="calDate(event.node.start.date)" />
      <h2 v-html="event.node.summary" />

      </li>
    </ul>
  </div>
  </Layout>
</template>

<page-query>
query {
  allGoogleCalendar(sortBy: "start.timestamp", order: ASC) {
    edges {
      node {
        summary
        start {
          date
          timestamp
        }
        end {
          date
          timestamp
        }
      }
    }
  }
}
</page-query>

<script>
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import moment from 'moment';


export default {
  data() {
    return {
      date: moment().format()
    }
  },
  components: {
    datetime: Datetime
  },
  methods: {
// startTime(date) {
// 		  return moment(date).format('LT');
// 		},
calDate(date) {
		  return moment(date).format('MMMM DD YYYY');
		},
  },
  computed: {
    filteredList() {
      return this.$page.allGoogleCalendar.edges.filter(element => {
        return element.node.start.timestamp >= moment(this.date).unix();
      });
    }
  },
}
</script>