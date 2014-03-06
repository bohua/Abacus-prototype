/**
 * Created by Bli on 14-3-6.
 */
angular.module('popup-dialog', [])
	.directive('popupDialog', function(){
		var Dialog = {
			restrict: 'E',
			scope: {
				config: "="
			},
			link: function ($scope, $element, $attributes) {
				var template;
				switch ($attributes.dialogStyle){
					case 'comparison': {
						template = '/src/platform/popup-dialog/popup-dialog-comparison.tpl.html';
						break;
					}
				}

				if(template){
					$('<div></div>').load(template, function(response, status, xhr){
						if ( status == "error" ) {
							return xhr.status + " " + xhr.statusText;
						}

						$($element).on('click', function(){
							$.Dialog({
								overlay: true,
								shadow: true,
								flat: true,
								icon: '<i class="icon-copy"></i>',
								title: '比较模式选择',
								content: response,
								padding: 10,
								width: 326,
								onShow: function(_dialog){
									$.Metro.initInputs();
								}
							});
						});
					});
				}


			}
		};

		return Dialog;
	});