<!DOCTYPE html>
<html>
<head>
	<title>Admin panel</title>
</head>
<body>

	<?php

		echo phpversion(); 

		$files = glob("./js/events/*.json");
		foreach ($files as &$value) {
		    echo $value;
		}
		

		// check files in folder
		// filter only ones that have config

		// send to the client what the configs are - isolate years and populate drop down
		
		// with drop down of years i.e. 2016, 2017, select current year if available
		// show options to delete config
		// show drop down for months, add to config, remove from config

	?>

</body>
</html>

