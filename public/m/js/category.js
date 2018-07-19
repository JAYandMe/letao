$(function () {
	$.ajax({
		type: "get",
		url: "/category/queryTopCategory",
		dataType: "json",
		success: function (aa) {
			$("#links").html(template("category-first", {
				result: aa.rows
			}));
			if (aa.rows.length > 0) {
				var id = aa.rows[0].id;;
				$.ajax({
					type: "get",
					url: "/category/querySecondCategory",
					data: {
						id: id
					},
					success: function (bb) {
						console.log(bb)
						$("#rightCate").html(template("category-second", {
							result: bb.rows
						}));
						$('#links').find('a:first-child').addClass('active');
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
				$('#rightCate').html(template('category-second',{result:result.rows}))
			}
		})
	});
});