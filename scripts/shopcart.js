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
		
			$(".productItem").click(function(e)
			{
				e.preventDefault();
				var iteminfo = $(this.dataset)[0];
				iteminfo.qty = 1;
				var itemincart = false;
				$.each(shopcart,function(index,value)
				{
				if (value.id == iteminfo.id) 
					{
						value.qty = parseInt(value.qty) + parseInt(iteminfo.qty);
						itemincart = true;
					}
				
				})
				if(!itemincart)
				{
					shopcart.push(iteminfo);
				}
				sessionStorage["shopcart"] = JSON.stringify(shopcart);
				outputCart();
				
			})
		
			function outputCart()
			{
				if(sessionStorage["shopcart"]!= null)
					{
						shopcart = JSON.parse(sessionStorage["shopcart"].toString());
						
						$('#checkoutdiv').show();
					}
				var holderHTML = '';
				var total = 0;
				var itemcount = 0;
				$.each(shopcart,function(index,value)
				{
					
					var stotal = value.qty * value.price;
					total += stotal;
					itemcount += parseInt(value.qty);
					holderHTML +='<tr><td><span class="btn btn-danger remove-item">X</span></td><td>'+value.qty+'</td><td>'+value.name+'</td><td>'+formatMoney(value.price)+'</td><td>'+formatMoney(stotal)+'</td></tr>';				
				})
				holderHTML +='<tr><td colspan="4" class="text-xs-right">Total Price</td><td>'+formatMoney(total)+'</td></tr>';
				$("#output").html(holderHTML);
				$('.total').html(formatMoney(total));
				$('.items').html(itemcount);
			
			}
			function formatMoney(n)
			{
				return '£' + (n/100).toFixed(2);
			}
		})