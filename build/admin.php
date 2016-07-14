<!DOCTYPE html>
<html>
<head>
	<title>Admin panel</title>
</head>
<body>
	<?php require_once("includes/application.php"); ?>

	<select name="year" onchange="if (this.value) { window.location=this.value }">
		<option value="">Select a year to edit...</option>

		<?php foreach ($yearsCollection as $key => $year): ?>
			<?php preg_match("/\d{4}/", $key, $date); ?>
			<option value="year-display.php?year=<?php echo $date[0]; ?>"><?php echo $date[0]; ?></option>
		<?php endforeach; ?>
	</select>
</body>
</html>
