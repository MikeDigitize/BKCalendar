# React Events Calendar

A dynamic events calendar built with React and Redux.

![calendar](https://raw.githubusercontent.com/MikeDigitize/BKCalendar/master/react-calendar.jpg "Calendar example 1")

[Demo](http://mikedigitize.com/react-calendar/)   

In this example it's a sporting events calendar but it can be easily used for any kind of events. It's fed from a simple JSON file (per calendar year). 

```json
// e.g. 2016 - an object representing each month and the respective events in that month
[{
  "month" : "January",
  "events": {
    "rugby": [],
    "football": [
      {
        "date": "17",
        "time": "19:45 - 21:45",
        "desc": "Man Utd vs Liverpool",
        "venue": "Old Trafford",
        "competition": "Europa League"
      }
    ],
    "cricket": [],
    "horse-racing": []
  }
}
]

```

If the user tries to progress past the current year it will attempt to load in the config for the next year but if it can't find one it won't progress any further. You also can't progress back beyond the current date.

Events from the config are clickable and display a pop up containing the event information.

![calendar](https://raw.githubusercontent.com/MikeDigitize/BKCalendar/master/react-calendar2.jpg "Calendar example 2")

TODO:

* unit tests
* more customisation
* take React out of development mode



