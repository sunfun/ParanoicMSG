requirejs.config({
	paths: {
		"webix" : "libs/webix",
		"databoom": "https://databoom.space/databoom",
		"databoomWebix": "https://databoom.space/databoom.webix",
		"crypt": 'crypt/cesar'
	}
});

require(['crypt', 'webix', 'databoom', 'databoomWebix'], function(crypt){

	var config = {
		basePath: 'https://t014.databoom.space/api1/b014/collections/crypto',
		baseHost: 'https://t014.databoom.space',
		baseName: 'b014',
		collection: 'crypto'
	}

	data = webix.proxy("databoomtree", config.basePath);
	db = databoom(config.baseHost, config.baseName);

	webix.ui(
			{rows:[
				{view:'toolbar', cols:[
					{view:'button', value:'Удалить',align:'right', width:100, click:function(){
						var id = $$("datatableCblp").getSelectedId();
						$$("datatableCblp").remove(id);
						db.del(id);
					}},
					{view:'button', value:'Расшифровать выделенные',width:200, click:function(){
						var sel = $$("datatableCblp").getSelectedId();
						if(!Array.isArray(sel)){
							var row = $$("datatableCblp").getItem(sel.row);
							row['msg'] = crypt.off(row.msg);
							row['from'] = crypt.off(row.from);
							$$("datatableCblp").updateItem(sel.row, row);
						}else{
							for(key in sel){
								var row = $$("datatableCblp").getItem(sel[key].row);
								row['msg'] = crypt.off(row.msg);
								row['from'] = crypt.off(row.from);
								$$("datatableCblp").updateItem(sel[key].row, row);
							}
						}
					}}
				]},
				{view:"datatable", id:'datatableCblp',url: data, select:'row', multiselect:true, columns:[
					{id:'from', header:['От кого']},
					{id:'msg', header:['Сообщение']}
				]},
				{view: 'resizer'},
				{view:'form', gravity:0.4,elements:[
					{cols:[
						{ view:"textarea", label:"Сообщение", id:'Message',height:50 },
						{rows:[
							{ view:"text", label:"Псевдоним", id:'NickName'},
							{ view:"text", label:"Ключ", id:'CryptoKey'},
							{ view:"button", value:"Отправить", click:function(){
								var newData = {};
								newData.from = crypt.on($$('NickName').getValue(), $$('CryptoKey').getValue()); // crypt
								newData.msg = crypt.on($$('Message').getValue(), $$('CryptoKey').getValue());  // crypt
								db.save(config.collection, newData);
								$$('Message').setValue('')
							}}
						]}
					]}
				]}
			]}
		)

	setInterval(function(){
		var data = $.getJSON(config.basePath,function(data){
			var Things  = data.d.results;
			for (var key in Things) {
				if (!($$('datatableCblp').getIndexById(Things[key].id) + 1)) {
					var newMsg = Things[key];
					newMsg.from = crypt.off(Things[key].from, $$('CryptoKey').getValue());
					newMsg.msg = crypt.off(Things[key].msg, $$('CryptoKey').getValue());
					$$('datatableCblp').add(newMsg);
				};
			};
		});
	},1000);

});