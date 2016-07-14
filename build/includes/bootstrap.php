<?php

defined('APPLICATION_PATH') || define('APPLICATION_PATH', realpath(dirname(__FILE__) . '/../'));

set_include_path(implode(PATH_SEPARATOR, array(
	realpath(APPLICATION_PATH . '/includes/classes'),
	realpath(APPLICATION_PATH . '/includes'),
	get_include_path(),
)));

function autoload($className) {
	$classFile = explode('_', $className);
	$classFile = functionDeep('ucfirst', $classFile);
	$classFile = 'includes/classes/' . implode('/', $classFile) . '.php';
	
	if (!class_exists($className, false)) {
		if (file_exists($classFile)) {
			require_once($classFile);
		}
		else {
			throw new Exception("Cannot locate " . $classFile . " class.");
			return;
		}
	}
}

function functionDeep($func, $input) {
	return is_array($input) ? array_map('functionDeep', array_fill(0, count($input), $func), $input) : $func($input);
}

spl_autoload_register("autoload");