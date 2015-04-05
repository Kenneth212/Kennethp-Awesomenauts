<?php

$date = new Datetime("TODAY");

$time = new Datetime('America/Los_Angeles');
//month-day-year
echo $date->format("-M-D-Y-") . "at" . $time->format("h:i");
?>