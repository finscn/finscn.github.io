function SconDoc(options) {
    for (var p in options) {
        this[p] = options[p];
    }
    this.init();
}

SconDoc.prototype = {

    entities: null,
    files: null,

    init: function() {
        var scon = this.scon;
        this.parseFolders(scon.folder);
        this.parseEntities(scon.entity);
    },

    parseFolders: function(folders) {

        this.folders = [];
        this.imageInfo = {};
        var Me = this;
        folders.forEach(function(folder) {
            Me.folders.push(Me.parseFolder(folder));
        });
        // console.log(this.imageInfo);
    },

    parseFolder: function(folder) {
        var Me = this;
        var files = [];
        var fileList = folder.file;
        fileList.forEach(function(file) {
            Me.imageInfo[file.name] = {
                id: file.id,
                name: file.name,
                width: file.width,
                height: file.height,
                pivot_x: file.pivot_x,
                pivot_y: file.pivot_y,
            }
            files.push(Me.imageInfo[file.name]);
        });
        return files;
    },

    parseEntities: function(entities) {
        this.entityMap = {};
        var Me = this;
        entities.forEach(function(entity) {
            Me.entityMap[entity.name] = Me.parseEntity(entity);
        });

    },

    parseEntity: function(entity) {
        entity = new SconEntity(entity);
        entity.parent = this;
        entity.init();
        return entity;
    }
}
