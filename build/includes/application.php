<?php

require_once("includes/bootstrap.php");

$yearsCollection = new Collection();

// load the year config files
$configFiles = glob("./js/events/*.json");

foreach ($configFiles as $yearFile) {
	// load the file and turn to JSON
	$year = json_decode(file_get_contents($yearFile));

	// create a collection and create collection month
	$months = new Collection();

	foreach ($year as $month) {
		$monthName = $month->month;
		$eventsJSON = $month->events;

		$events = new Collection();

		// create an events collection
		foreach ($events as $eventType) {
			$events->addItem($eventType);
		}

		$months->addItem($events, $monthName);
	}

	preg_match("/\d{4}/", $yearFile, $date);
	$yearsCollection->addItem($months, $date[0]);
}
