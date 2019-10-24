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

Input | Type | Default value | Description
------------ | ------------- | ------------- | -------------
dayCount  | number | 7 | Number of display displayed per row
daysToExclude  | function | () => {...} | Days to exclude from selection
minDate | any | - | Minimum date to display
maxDate | any | - | Maximum date to display
scrollSensivity | number | 1.0 | Sensibility of scrolling
locale | string | - | Zone to use as locale
firstDayAutoSelected | boolean | false | Autoselection of day for today
displayMode | string | daily | Render day by day or weekly

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