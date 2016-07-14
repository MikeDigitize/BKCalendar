<!DOCTYPE html>
<html>
<head>
	<title>Admin panel</title>
</head>
<body>
	<?php error_reporting(-1);
		ini_set('display_errors', 'On');require_once("includes/application.php"); ?>

	<?php $year = ($_GET && $_GET['year']) ? $yearsCollection->getItem($_GET['year']) : false; ?>

	<?php if ($year && $year->getItemCount()): ?>
		<h1>Year: <?php echo $_GET['year']; ?></h1>

		<a href="edit.php">Add new event</a>

		<?php foreach ($year as $monthName => $months): ?>
			<h2><?php echo $monthName; ?></h2>

			<?php foreach ($months as $month): ?>
				<?php if ($month->getItemCount()): ?>
					<ul>
						<?php foreach ($month as $event): ?>
							<li><?php echo $event; ?></li>
						<?php endforeach; ?>
					</ul>,/
				<?php else: ?>
					<p>No events found in <?php echo $monthName; ?></p>
				<?php endif; ?>
			<?php endforeach; ?>
		<?php endforeach; ?>
	<?php else: ?>
		<p>Year not found</p>
	<?php endif; ?>
</body>
</html>
