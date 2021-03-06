// based on src/avm2/bin/dumpabc.js
load("../../lib/DataView.js/DataView.js");

this.self = this;
load("../../src/swf/swf.js");
load("../../src/swf/util.js");
load("../../src/swf/types.js");
load("../../src/swf/structs.js");
load("../../src/swf/tags.js");
load("../../src/swf/inflate.js");
load("../../src/swf/stream.js");
load("../../src/swf/templates.js");
load("../../src/swf/generator.js");
load("../../src/swf/handlers.js");
load("../../src/swf/parser.js");
load("../../src/swf/bitmap.js");
load("../../src/swf/button.js");
load("../../src/swf/font.js");
load("../../src/swf/image.js");
load("../../src/swf/label.js");
load("../../src/swf/shape.js");
load("../../src/swf/text.js");

load("../../src/avm2/util.js");

SWF.parse(snarf("bin/library.swf", "binary"), {
  oncomplete: function(result) {
    var tags = result.tags;
    var abcCount = 0;
    var offset = 0;
    var files = [];
    for (var i = 0, n = tags.length; i < n; i++) {
      var tag = tags[i];
      if (tag.code === 82) {
        files.push({name: tag.name, offset: offset, length: + tag.data.length, data: tag.data});
        offset += tag.data.length;
      }
    }
    var data = new Uint8Array(offset);
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      data.set(file.data, file.offset);
      // print ("Name: " + file.name + ", Offset: " + file.offset + ", Length: " + file.length);
      delete file.data;
    }
    print (base64ArrayBuffer(data));
  }
});
