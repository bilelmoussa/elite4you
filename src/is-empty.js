export const  empty = (data) => {
	if(typeof(data) == 'number' || typeof(data) == 'boolean')
	{ 
	  return false; 
	}
	if(typeof(data) == 'undefined' || data === null)
	{
	  return true; 
	}
	if(typeof(data.length) != 'undefined')
	{
	  return data.length === 0;
	}
	if(typeof data === "string" &&  ( data === "" || data === null )){
		return true;
	}
	var count = 0;
	for(var i in data)
	{
	  if(data.hasOwnProperty(i))
	  {
		count ++;
	  }
	}
	return count === 0;
  }