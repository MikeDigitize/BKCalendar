<?php

class Collection implements IteratorAggregate, Countable
{
	protected $_members = array();

	public function count()
	{
		return $this->getItemCount();
	}
	
	public function addItem($obj, $key = null) 
	{	
		if ($key) {
			if (isset($this->_members[$key])) {
				throw new KeyInUseException("Key '" . $key . "' already in use!");
			} else {
				$this->_members[$key] = $obj;
			}
		}
		else {
			$this->_members[] = $obj;
		}
		return $this;
	}
	
	public function removeItem($key)
	{	
		if (isset($this->_members[$key])) {
			unset($this->_members[$key]);
		} else {
			throw new KeyInvalidException("Invalid key '" . $key . "'!");
		}
		return $this;
	}
	
	public function removeAllItems()
	{	
		$this->_members = array();
		return $this;
	}
	
	public function getItem($key)
	{	
		if (isset($this->_members[$key])) {
			return $this->_members[$key];
		}
		else {
			return false;
		}
	}
	
	public function getKeys()
	{	
		return array_keys($this->_members);
	}
	
	public function itemExists($key)
	{	
		return isset($this->_members[$key]);
	}
	
	public function getItemCount()
	{	
		return count($this->_members);
	}
	
	public function getIterator()
	{
		return new ArrayIterator($this->_members);
	}
}