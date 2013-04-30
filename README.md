# Overview

This is a little XML parsing app I wrote to try and estimate whether PG&E customers are better off on the E9-A or the EV-A rate plan.
It can use actual usage data downloaded from PG&E to calculate hopefully quite accurately for you.
It's a little rough right now -- just basically outputs expected total cost of the data chunk you downloaded assuming you had been on rate plan E9-A or EV-A at the time.  It assumes billing periods are on month boundaries for purposes of baseline calculations.  If you use the `-m` option to add electric car miles to the downloaded data, it assumes all that charging happens instantaneously at midnight (off-peak) at the start of every day.  I could use some charging rate and spread it over a few hours, but that won't affect cost much (baseline will shift slightly for E9 rate, but not much).

# HOWTO

First, install [node.js](http://nodejs.org/)

Then, install some modules:

    npm install optimist
    npm install date-utils
    npm install node-xml

## PG&E Data Download

1. Log in to PG&E
2. Go to "My Usage"
3. Click "Green Button Download My Data" at the bottom right
4. Under "For developers and third parties (.xml file)", choose "Export usage for a range of days" and choose the maximum range it allows you.
5. Your browser will now download a ZIP file called something like pge_interval_data_2012-03-30_to_2013-03-13.zip

Unzip that; it'll contain 2 files.  One for electric data, one for gas.  Ignore the gas one.  The electric one is your input file.

### Caveats

The best thing to do is download a long period of data which does NOT include electric car charging (so you get a long baseline of house-only time), then have the program add car charging estimates -- it'll add the number of miles per day * Wh per mile EVERY DAY at midnight (ie always off-peak).


## Running

Now run (obviously use your own electric XML filename):

    ./parse.js pge_electric_interval_data_2012-03-30_to_2013-03-13.xml

Output will look something like:

    Total E9: 3620.82   Total EV: 2023.52

There are some optional flags that default to "My house in San Mateo County", "50 miles per day electric driving" and "350 Wh/mile".  You can type

    ./parse.js

with no arguments to get help information


# Resources

The program uses data gathered from the following PG&E documents:

* [Electric baseline regions](http://www.pge.com/tariffs/tm2/pdf/ELEC_PRELIM_A.pdf)

* [E9 rate plan](http://www.pge.com/tariffs/tm2/pdf/ELEC_SCHEDS_E-9.pdf)

* [EV rate plan proposal](http://www.pge.com/nots/rates/tariffs/tm2/pdf/ELEC_3910-E-A.pdf)
