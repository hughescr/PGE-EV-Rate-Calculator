# NOTE: PG&E has completely changed how they do downloading of your data; this project needs a major update to get the new data.  I'll see about doing that, maybe.  More likely as PCE is kicking PG&E out of San Mateo County, I'll just make sure it works with whatever PCE sets up.

# Overview

This is a little XML parsing app I wrote to try and estimate whether PG&E customers are better off on the E9-A or the EV-A rate plan.

It can use actual usage data downloaded from PG&E to calculate hopefully quite accurately for you.

It assumes billing periods are on month boundaries for purposes of baseline calculations.  It may or may not use quite the same algorithm as PG&E does for calculating what %age of baseline you're at, but it's probably close enough for horseshoes.

If you use the `-m` option to add electric car miles to the downloaded data, it assumes all that charging happens instantaneously at midnight (off-peak) at the start of every day.  I could use some charging rate and spread it over a few hours, but that won't affect cost much (baseline will shift slightly for TOU rates, but not much).

# HOWTO

First, install [node.js](http://nodejs.org/)

Then, install this package:

    sudo npm install -g pge-analyzer

## PG&E Data Download

1. Log in to PG&E
2. Click the "Save Energy & Money" tab, and choose "Your Usage & Tools", and sub-menu item "Usage Analysis"
3. Click "Green Button Download My Data" at the bottom right
4. Under "For developers and third parties (.xml file)", choose "Export usage for a range of days" and choose the maximum range it allows you.
5. Your browser will now download a ZIP file called something like pge_interval_data_2012-03-30_to_2013-03-13.zip

Unzip that; it'll contain 2 files.  One for electric data, one for gas.  Ignore the gas one.  The electric one is your input file.

You can also (optionally) download "Export all bill totals", and as XML format.  You can pass that file to the program using the "-S" option -- the program will then use your billing periods instead of assuming that billing and baseline usage reset on the 1st of every month.  Note this is optional -- if you use "-m 0", then it should be pretty close to matching your actual historic billed data.  If you don't provide this "-S" file, the overall estimate should be decent, but it won't match up month-for-month with your actual billed data.

### Caveats

The best thing to do is download a long period of data which does NOT include electric car charging (so you get a long baseline of house-only time), then have the program add car charging estimates -- it'll add the number of miles per day * Wh per mile EVERY DAY at midnight (ie always off-peak).


## Running

Now run (obviously use your own electric XML filename):

    pge-analyzer pge_electric_interval_data_2008-03-30_to_2013-03-13.xml

Output will look something like:

    Rate: E1
    Summer  Cost: $7010.64   Per day: $11.49
    Winter  Cost: $9126.48   Per day: $13.58
    Total   Cost: $16137.12  Per day: $12.59
    Rate: E6
    Summer  Cost: $7185.56   Per day: $11.78
    Winter  Cost: $8577.94   Per day: $12.76
    Total   Cost: $15763.50  Per day: $12.30
    Rate: E7
    Summer  Cost: $6686.34   Per day: $10.96
    Winter  Cost: $8025.64   Per day: $11.94
    Total   Cost: $14711.98  Per day: $11.48
    Rate: E8
    Summer  Cost: $6959.59   Per day: $11.41
    Winter  Cost: $7481.49   Per day: $11.13
    Total   Cost: $14441.08  Per day: $11.26
    Rate: E9
    Summer  Cost: $5582.90   Per day: $9.15
    Winter  Cost: $6436.79   Per day: $9.58
    Total   Cost: $12019.69  Per day: $9.38
    Rate: EV
    Summer  Cost: $3752.77   Per day: $6.15
    Winter  Cost: $4576.09   Per day: $6.81
    Total   Cost: $8328.86   Per day: $6.50

Those numbers are basically the amount in dollars you would expect to have paid if you had been on the specified rate plan during the period covered by the data you downloaded.

There are some optional flags that default to "Where I live in San Mateo County", "50 miles per day electric driving" and "350 Wh/mile", and "I do heat my house with gas not electric".  You can type

    pge-analyzer

with no arguments to get help information on how to change from those defaults.


# Resources

The program uses data gathered from the following PG&E documents (as of 2016-04-04):

* [PG&E Tariff Data](http://www.pge.com/tariffs/ERS.SHTML)
