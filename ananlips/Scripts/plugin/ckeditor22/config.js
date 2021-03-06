/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function (config) {
    // Define changes to default configuration here. For example:
    // config.language = 'fr';
    // config.uiColor = '#AADC6E';

    config.extraPlugins = 'uploadimage';
    config.extraPlugins = 'uploadwidget';

    config.extraPlugins = 'widget';
    config.extraPlugins = 'lineutils';
    config.extraPlugins = 'widgetselection';

    config.extraPlugins = 'clipboard';
    config.extraPlugins = 'dialog';
    config.extraPlugins = 'notification';
    config.extraPlugins = 'toolbar';
    config.extraPlugins = 'button';

    config.extraPlugins = 'filetools';
    config.extraPlugins = 'notificationaggregator';

    config.toolbar = [
		//{ name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
		//{ name: 'clipboard', },
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		//{ name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
		//{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
		//'/',
		{ name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', 'CopyFormatting', 'RemoveFormat'] },
		{ name: 'paragraph', items: ['NumberedList', 'BulletedList', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
		{ name: 'links', items: ['Link', 'Unlink', 'Anchor'] },
		{ name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe'] },
		//'/',
		{ name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
		{ name: 'colors', items: ['TextColor', 'BGColor'] },
		{ name: 'tools', items: ['Maximize', 'ShowBlocks'] },
		//{ name: 'about', items: ['About'] }
    ];
    config.removeButtons = 'Strike,Subscript,Superscript,Outdent,Indent,Blockquote,CopyFormatting,RemoveFormat,CreateDiv,Language,Anchor,Flash,HorizontalRule,PageBreak,Iframe';
};
