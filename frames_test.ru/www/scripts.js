$(function (){
    $('li').click( { p: 0 }, function(e) {
        if (e.data.p == this) {
			if($(e.currentTarget).data('id')){
				var id = $(e.currentTarget).data('id');			
				var count = parseInt(prompt('Сколько единиц данного товара Вы желаете исключить из заказа?', 1));
				
				if(count > 0){
					var storeFrame = parent.frames.storeFrame.document,
						storeForm = $(storeFrame).find('[data-id="'+id+'"]').next()[0];
					var leftFrame = parent.frames.leftFrame.document,
						leftForm = $(leftFrame).find('[data-id="'+id+'"] form')[0];
					
					if(count <= leftForm.countText.value)//из поля < кол-во, иначе ошибка
					{
						$(storeFrame).find('[data-id="'+id+'"]').parent().show();
						var subCost = parseInt(storeForm.costText.value)*count;
						leftForm.costText.value -= subCost;
						$(leftFrame).find('[name="totalCostText"]').val($(leftFrame).find('[name="totalCostText"]').val()-subCost);
						storeForm.countText.value = parseInt(storeForm.countText.value) + count;
						leftForm.countText.value -= count;
						
						if(leftForm.countText.value == 0)
							$(e.currentTarget).find('.exContent').parent().hide();
					}
					else alert("Вы не можете исключить больше имеющегося количества единиц!");
				}
			}
			else {
				var id = $(e.currentTarget).find('.content').data('id');
				var count = parseInt(prompt('Сколько единиц данного товара Вы желаете приобрести?', 1));
				
				if(count > 0)
				{			
					var storeFrame = parent.frames.storeFrame.document,
						storeForm = $(storeFrame).find('[data-id="'+id+'"]').next()[0];
					var leftFrame = parent.frames.leftFrame.document,
						leftForm = $(leftFrame).find('[data-id="'+id+'"] form')[0];
						
					if( count <= $(storeForm).find('[name="countText"]').val()*1) {
						$(leftFrame).find('[data-id="'+id+'"]').show();
						var countProduct = leftForm.countText.value ? parseInt(leftForm.countText.value) : 0;
						leftForm.countText.value = countProduct + count;
						storeForm.countText.value -= count;
						var adder = leftForm.countText.value * storeForm.costText.value,
							allPrice = parseInt($(leftFrame).find('[name="totalCostText"]').val());
						leftForm.costText.value = adder;
						$(leftFrame).find('[name="totalCostText"]').val( (allPrice ? allPrice : 0) + adder - countProduct*storeForm.costText.value );
						
						if(storeForm.countText.value == 0)
							$(e.currentTarget).find('.exContent').hide();
					}
					else alert("Вы не можете приобрести больше имеющегося количества единиц!");
				}
			}			
            return;
        }
        if (e.data.p) e.data.p.className = '';
        this.className = 'on';
        e.data.p = this;
    });
	
	$("#cancelBtn").click(function() {
		for(var id=1;id<=5;id++)
		{
			var storeFrame = parent.frames.storeFrame.document,
				storeForm = $(storeFrame).find('[data-id="'+id+'"]').next()[0];
			var leftFrame = parent.frames.leftFrame.document,
				leftForm = $(leftFrame).find('[data-id="'+id+'"] form')[0];
				
			$(storeFrame).find('[data-id="'+id+'"]').parent().show();
			var count = parseInt(leftForm.countText.value);
			var subCost = parseInt(storeForm.costText.value)*count;
			leftForm.costText.value -= subCost;
			$(leftFrame).find('[name="totalCostText"]').val(0);
			storeForm.countText.value = count ? parseInt(storeForm.countText.value) + count : parseInt(storeForm.countText.value);
			leftForm.countText.value -= count;
			
			if(leftForm.countText.value == 0)
				$(leftFrame).find('.exContent').parent().hide();
		}
	});
});