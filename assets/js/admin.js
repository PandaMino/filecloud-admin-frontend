/*
 * 用户管理界面的文件分类功能
 */

$(function () {
	if (window.localStorage.getItem('arr')) {
		/* 从本地缓存里取出数据 */
		var arr = JSON.parse(window.localStorage.getItem('arr'));
		for (var i = 0; i < arr.length; i++) {
			oTr(arr, i);
		}
		console.log('从缓存里取出的数据：' + JSON.stringify(arr));
	} else {
		/* 申请数据 */
		getData();
	}

	/* 点击删除 */
	for (var i = 0; i < arr.length; i++) {
		$('.delBtn')[i].index = i;
		$('.delBtn').eq(i).click(function () {
			$(this).parent().parent().remove();
			var Name = $(this).parent('td').parent('tr').children('td').html();
			var Upuser = $(this).parent('td').parent('tr').children('td').next('td').html();
			for (var i = 0; i < arr.length; i++) {
				if (arr[i].name == Name) {
					if (arr[i].upuser == Upuser) {
						arr.splice(i, 1);
						window.localStorage.setItem('arr', JSON.stringify(arr));
					}
				}
				
			}
		});
	}
});

function getData () {
	$.ajax({
		type: 'get',
		url: 'data/demo.json',
		dataType: 'json',
		success: function (data) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].state == 1) {
					oTr(data, i);

					/* 将请求到的数据本地存储 */
					window.localStorage.setItem('arr', JSON.stringify(data));
				}
			}
			for (var i = 0; i < data.length; i++) {
				$('.delBtn')[i].index = i;
				$('.delBtn').eq(i).click(function () {
					$(this).parent().parent().remove();
					var Name = $(this).parent('td').parent('tr').children('td').html();
					var Upuser = $(this).parent('td').parent('tr').children('td').next('td').html();
					for (var i = 0; i < arr.length; i++) {
						if (arr[i].name == Name) {
							if (arr[i].upuser == Upuser) {
								arr.splice(i, 1);
								window.localStorage.setItem('arr', JSON.stringify(arr));
							}
						}
						
					}
				});
			}
		},
		error: function (e) {
			console.log('error');
		}
	});
}

function oTr (data, i) {
	var $oTr = '';
	var d;

	if (data[i].read) {
		d = '已显示';
	} else {
		d = '已隐藏';
	}
	$oTr = $('<tr><td>' + data[i].name + '</td><td>' + data[i].upuser + '</td><td>' + data[i].uptime + '</td><td>' + data[i].Dnum + '</td><td>' + d + '</td><td><button class="btn btn-default delBtn">删除</button></td></tr>');

	switch (data[i].type) {
		case "document":
			$('#document').children('tbody').append($oTr);
			break;
		case "video":
			$('#video').children('tbody').append($oTr);
			break;
		case "audio":
			$('#audio').children('tbody').append($oTr);
			break;
		case "img":
			$('#img').children('tbody').append($oTr);
			break;
		case "zip":
			$('#zip').children('tbody').append($oTr);
			break;
		case "other":
			$('#other').children('tbody').append($oTr);
			break;
		default:
			break;
	}
}
