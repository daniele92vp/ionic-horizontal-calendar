# ionic-horizontal-calendar

<pre>



</pre>


**Customizable calendar with touchable scrolling and arrow to render the next days**
![Alt text](./screenshot/screenshot1.PNG?raw=true "Title")
![Alt text](./screenshot/screenshot2.PNG?raw=true "Title")
![Alt text](./screenshot/screenshot3.PNG?raw=true "Title")

## Installation

<pre>npm i ionic-horizontal-calendar</pre>

## Usage and input available

###### The following example show how to use the ionic-horizontal-calendar

```javascript
<ionic-horizontal-calendar 
  locale="de" 
  [minDate]="minDate"
  class="calendar"
  [firstDayAutoSelected]="true"
  displayMode="daily"
  >
    <ion-label header #header>
        Calendar Demo
    </ion-label>
</ionic-horizontal-calendar>
```


###### Following are the Input properties available

Input | Type | Default value
------------ | -------------
dayCount  | number | 7
daysToExclude  | function | ()
minDate | any | -
maxDate | any | -
scrollSensivity | number | 1.0
locale | string | -
firstDayAutoSelected | boolean | false
displayMode | string | daily

###### Following are the Output properties available
Output | Type
------------ | -------------
nextDayClicked | function
prevDayClicked | function
daySelected | function

## Customization

###### The following css properties are customizable, simple pass a class and inside of it customize what you prefer

<pre>
--background-color-calendar
--border-botto-calendar
--padding-top-calendar

--margin-header
--margin-bottom-header
--text-align-header
--display-header
--align-items-header
--justify-content-header
--font-size-header
  
--color-month
--margin-month
--text-align-month
--font-size-month
  
--width-days
--height-days
    
--width-arrow

--opacity-disabled-arrow
    
--background-color-day-unavailable
--border-bottom-day-selected
--font-size-number-date
--text-align-number-date
--color-number-date
--font-size-text-date
--color-text-date
--text-align-text-date
--color-number-day-unavailable
--color-text-day-unavailable        
</pre>