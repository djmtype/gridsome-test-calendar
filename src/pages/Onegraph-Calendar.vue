<template>
<Layout>
	<div>
		<p>Today's date is: {{ format(new Date(), "MMMM dd yyyy") }}</p>

	

{{ rightNow() }}

		Also the Current date is {{ IsoDate() }}

		<ul>
			<li v-for="event in filterEvents" :key="event.id">
				<span v-if="event.start.dateTime">
					{{ fullDate(event.start.dateTime) }}
				</span>
        <span v-else-if="event.start.date">
          {{ fullDate(event.start.date) }}
        </span>
        <h2 v-html="event.summary" />
			</li>
		</ul>
	</div>
	</Layout>
</template>

<page-query>
query {
	oneGraphCal {
		google {
			calendar {
				        events(calendarId: "c_r6r4mq28l8p7u789h8qcrgci34@group.calendar.google.com", orderBy: "startTime", timeMin: "2020-12-01T00:00:00-05:00", first: 500) {

						
					nodes {
						updated
						id
						created
						summary
						description
						location
						start {
							dateTime
              date
						}
						end {
              date
							dateTime
						}
					}
				}
			}
		}
	}
	}
</page-query>

<script>
// import moment from 'moment'
import {
	addDays,
	format,
	parseISO,
	formatISO,
	isToday,
	startOfToday,
	setMilliseconds,
	getMilliseconds,
	getTime,
} from "date-fns";

export default {
	metaInfo: {
		title: "Hello, world!",
	},

	data() {
		return {
			
			now: new Date().toISOString(),
			format,
			formatISO,
			getTime,
			getMilliseconds,
			setMilliseconds,
		};
	},

	methods: {
		rightNow() {
		var timeInMs = Date.now();
		return timeInMs;
		},


		updateNow() {
			this.now = new Date().toISOString();
		},

		location(str) {
			return str.replace(/\r*\n/g, "<br>");
		},
		description(str) {
			return str.replace(/\r*\n/g, "<br>");
		},
		fullDate(date) {
			return format(parseISO(date), "MMM dd, yyyy (p)");
		},

		milsec(date) {
			return getTime(parseISO(date));
		},

		// 2020-10-06T0:00:00-05:00
		// currentDate() {
		//   return this.format(new Date(), 'yyyy-MM-dd')
		// }

		IsoDate() {
			//	return this.format(new Date()).formatISO()
			// formatISO(new Date())
			//return this.formatISO(new Date())
			return new Date().toISOString();
		},

		// milsec(date) {
		// 	return setMilliseconds(date, milliseconds)
		// }

		// today(date) {
		// 		return format(new Date(), '[Today is a] dddd');
		// },

		// today() {
		// 	var result = startOfToday()
		// 	return result
		// }

		// 				withBrTags: function() {
		//   const doc = this.event.description
		//   return doc.replace(/(\\r)*\\n/g, '<br>')
		// }
		//  fullDate(date) {
		//   return moment(date).format('MMMM DD, YYYY');
		// },
		// calDate(date) {
		//   return moment(date).format('MMM DD');
		// },
		// startTime(date) {
		//   return moment(date).format('LT');
		// },
	},

	computed: {
		filterEvents() {
			return this.$page.oneGraphCal.google.calendar.events.nodes.filter(
				(node) => {
          var eventDate = getTime(parseISO(node.end.date));
          var eventDateTime = getTime(parseISO(node.end.dateTime));
          // var currentDate = new Date();
          var currentDate = Date.now();
					// var eventEnd = getTime(parseISO(node.end.dateTime));
					 // console.log(eventStartDate || eventStartDateTime);
					  return (eventDate || eventDateTime) >= currentDate;
				}
			);
		},

		// date_function() {
		//             var currentDate = new Date().toISOString();
		//             console.log(currentDate);

		//         },

		// formattedPublishDate() {
		//   return moment(this.post.datetime).format('DD MMMM, YYYY');
		// },
		// withBrTags: function() {
		// 		const doc = this.event.description
		// 		return doc.replace(/\r*\n/g, '<br>')
		// 	},
		// 		myFunction: function () {
		// this.event.description = this.event.description.replace(/\r*\n/g, "<br>");
		// }
	},

	// mounted() {
	// 	this.date_function()
	// }
};
</script>

<style>
li {
	margin-bottom: 3rem;
}
</style>
