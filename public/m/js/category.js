$(function () {
	$.ajax({
		type: "get",
		url: "/category/queryTopCategory",
		dataType: "json",
		success: function (aa) {
			$("#links").html(template('category-first', {
				result: aa.rows
			}));
			if (aa.rows.length > 0) {
				var id = $(this).attr("data-id");
				// console.log(id)

				$.ajax({
					type: "get",
					url: "/category/querySecondCategory",
					data: {
						id: id
					},
					success: function (res) {
						// console.log(res);
						$("#rightCate").html(template('category-second', {
							result: res.rows
						}));
						$('#leftCate').find('a:first-child').addClass('active');
					}
				});
			}
		}
	});

	$('body').on('tap','.getSecond',function(){
		var id = $(this).attr('data-id');

		$(this).addClass('active').siblings().removeClass('active');
		$.ajax({
			type:'get',
			url:'/category/querySecondCategory',
			data:{
				id:id
			},
			success:function(result){
				$('#rightCate').html(template('rightCateTpl',{data:result.rows}))
			}
		})
	})
})