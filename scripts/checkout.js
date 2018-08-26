var shopcart =[];
$(document).ready(function()
{			
	outputCart();
	
	$('#output').on('click','.remove-item',function()
		{
		
			var itemToDelete = $('.remove-item').index(this);
			shopcart.splice(itemToDelete,1);
			sessionStorage["shopcart"] = JSON.stringify(shopcart);
			outputCart();
				
			})
			
	$('#output').on('change','.dynqty',function(){
	var iteminfo = $(this.dataset)[0];
		
	var itemincart = false;
	var removeItem = false;
	var itemToDelete = 0;
	console.log(shopcart);
	var qty = $(this).val();
				
	$.each(shopcart,function(index,value)
		{
			if(value.id == iteminfo.id)
			{
				if(qty <= 0)
				{
					removeItem = true;
					itemToDelete = index;
				}
				else
				{
					shopcart[index].qty = qty;
					itemincart = true;
				}
			}
				
		})
	if(removeItem)
		{
			shopcart.splice(itemToDelete,1);
		
		}
		
		
	sessionStorage["shopcart"] = JSON.stringify(shopcart)
	outputCart();
			
	console.log(sessionStorage["shopcart"] );			
	})
				
	function outputCart()
	{
		if(sessionStorage["shopcart"]!= null)
			{
				shopcart = JSON.parse(sessionStorage["shopcart"].toString());
						
						
			}
		var holderHTML = '';
		var total = 0;
		var itemcount = 0;
		$.each(shopcart,function(index,value)
		{
			console.log(index);
			var stotal = value.qty * value.price;
			var a = (index +1);
			total += stotal;
			itemcount += parseInt(value.qty);
			holderHTML +='<tr><td><span class="btn btn-danger remove-item">X</span></td><td><input type="number" class="dynqty" name="quantity_'+a+'" value="'+value.qty+'"data-id ="'+value.id+'"></td><td><input type="hidden" name="item_name'+a+'" value="'+value.name+'">'+value.name+'</td><td><input type="hidden" name="amount_'+a+'" value="'+formatMoney(value.price)+'">£'+formatMoney(value.price)+'</td><td>'+formatMoney(stotal)+'</td></tr>';				
		})
			holderHTML +='<tr><td colspan="4" class="text-xs-right">Total Price</td><td>£'+formatMoney(total)+'</td></tr>';
			$("#output").html(holderHTML);
			
		}
		function formatMoney(n)
		{
			return(n/100).toFixed(2);
		}
		})