function SconAnimation(options) {
    for (var p in options) {
        this[p] = options[p];
    }
}

SconAnimation.prototype = {
    name: null,
    length: 0,
    frames: null,
    looping: true,

    init: function() {
        var Me = this;
        this.frames = [];
        // this.length=600;
        this.scon = this.parent.parent;
        this.mainline = this.mainline.key;
        this.parseTimelines(this.timeline);
        this.parseMainline(this.mainline);
    },

    parseTimelines: function(timelines) {
        var Me = this;
        this.timelines = [];
        timelines.forEach(function(timeline) {
            Me.timelines.push(Me.parseTimeline(timeline));
        });
    },

    parseTimeline: function(timeline) {
        var frames = [];
        var keyFrames = timeline.key;
        if (keyFrames && keyFrames.length > 0) {
            var frame = keyFrames[0];
            frames.push(frame);
            for (var i = 1; i < keyFrames.length; i++) {
                var next = keyFrames[i];
                frame.duration = (next.time || 0) - (frame.time || 0);
                var nextValue = next.bone || next.object;
                frame.next = {
                    x: nextValue.x || 0,
                    y: nextValue.y || 0,
                    angle: nextValue.angle || 0,
                    scale_x: nextValue.scale_x || 1,
                    scale_y: nextValue.scale_y || 1,
                };
                frame = next;
                frames.push(frame);
            }
            if (this.looping && keyFrames.length > 1) {
                var next = keyFrames[0];
                var nextValue = next.bone || next.object;
                frame.duration = this.length - frame.time;
                frame.next = {
                    x: nextValue.x || 0,
                    y: nextValue.y || 0,
                    angle: nextValue.angle || 0,
                    scale_x: nextValue.scale_x || 1,
                    scale_y: nextValue.scale_y || 1,
                };
            }
        }
        return frames;
    },

    parseMainline: function(mainline) {

    },


    getMainKeyFrameByTime: function(time) {
        var index = 0;
        this.mainline.some(function(m, idx) {
            if (m.time > time) {
                index = idx - 1;
                return true;
            }
        });
        return this.mainline[index];
    },

    createKeyFrames: function(frameCount) {
        var timeStep = this.length / frameCount;
        var time = 0;
        this.frames.length = 0;
        var mainlineCount = this.mainline.length - 1;
        // console.log(mainlineCount)
        for (var i = 0; i < frameCount; i++) {
            var mainKeyFrame;
            for (var j = mainlineCount; j >= 0; j--) {
                if ((this.mainline[j].time || 0) <= time) {
                    mainKeyFrame = this.mainline[j];
                    break;
                }
            }

            var frame = this.createKeyFrame(mainKeyFrame, time);
            this.frames.push(frame);
            time += timeStep;
        }
    },

    getTweenValue: function(a, b, duration, passed, tween) {
        // a+((b – a)*((currentTime-timeA)/(timeB-timeA)))
        // console.log(a, b, duration, passed)
        return a + (b - a) * (passed / duration);
    },
    getTweenAngle: function(a, b, duration, passed, spin, tween) {
        // a+((b – a)*((currentTime-timeA)/(timeB-timeA)))
        // console.log(a, b, duration, passed)
        var d = b - a;
        d = d % 360;
        if (d == 0) {
            return a;
        }
        // console.log(d, passed,duration, d * (passed / duration))
        if (spin < 0) {
            d = d - 360;
        } else {
            d = d + 360;
            // d=-d
        }
        d = d % 360;

        // console.log(a, b, d, "--", spin,b-a)
        return (a + d * (passed / duration));
    },
    getCurrentFrame: function(keyFrame, time) {
        var current = keyFrame.bone || keyFrame.object;
        keyFrame.time = keyFrame.time || 0;
        if (keyFrame.time == time || !keyFrame.next) {
            return {
                x: current.x || 0,
                y: current.y || 0,
                angle: current.angle || 0,
                scale_x: current.scale_x || 1,
                scale_y: current.scale_y || 1,
            }
        } else {
            var duration = keyFrame.duration;
            var passed = time - (keyFrame.time || 0);
            var next = keyFrame.next;
            return {
                x: this.getTweenValue(current.x || 0, next.x, duration, passed),
                y: this.getTweenValue(current.y || 0, next.y, duration, passed),
                angle: this.getTweenAngle(current.angle || 0, next.angle, duration, passed, keyFrame.spin || 0),
                scale_x: this.getTweenValue(current.scale_x || 1, next.scale_x, duration, passed),
                scale_y: this.getTweenValue(current.scale_y || 1, next.scale_y, duration, passed),
            }
        }
    },
    createKeyFrame: function(mainKeyFrame, time) {
        if (!mainKeyFrame) {
            return null;
        }
        var Me = this;
        var bones = [];
        var bone_ref = mainKeyFrame.bone_ref;
        bone_ref.forEach(function(boneRef) {
            var frames = Me.timelines[boneRef.timeline];
            var keyFrame = frames[boneRef.key];
            var current = Me.getCurrentFrame(keyFrame, time);
            var bone = {
                time: time || 0,
                parent: boneRef.parent || boneRef.parent === 0 ? boneRef.parent : null,
                id: keyFrame.id,
                spin: keyFrame.spin || 0,
                x: current.x,
                y: -current.y,
                rotation: -current.angle * Math.PI / 180,
                scaleX: current.scale_x,
                scaleY: current.scale_y,
                children: []
            };
            bones.push(bone);
        });

        var objects = [];
        var object_ref = mainKeyFrame.object_ref;
        object_ref.forEach(function(objRef) {
            var frames = Me.timelines[objRef.timeline];
            var keyFrame = frames[objRef.key];
            var file = Me.scon.folders[keyFrame.object.folder][keyFrame.object.file];
            var current = Me.getCurrentFrame(keyFrame, time);

            var pivotX = keyFrame.object.pivot_x || keyFrame.object.pivot_x === 0 ? keyFrame.object.pivot_x : file.pivot_x;
            var pivotY = 1 - (keyFrame.object.pivot_y || keyFrame.object.pivot_y === 0 ? keyFrame.object.pivot_y : file.pivot_y);

            var object = {
                time: time || 0,
                parent: objRef.parent || objRef.parent === 0 ? objRef.parent : null,
                zIndex: parseInt(objRef.z_index) || 0,
                id: keyFrame.id,
                spin: keyFrame.spin || 0,

                x: current.x,
                y: -current.y,
                rotation: -current.angle * Math.PI / 180,
                scaleX: current.scale_x,
                scaleY: current.scale_y,
                w: file.width,
                h: file.height,
                origX: file.width * pivotX,
                origY: file.height * pivotY,
                imgName: getBaseName(file.name)
            };
            if (file.name.indexOf("foot") > 0) {
                // console.log(object.imgName,object.pivotX,object.pivotY)

            }
            objects.push(object);
        });

        var tree = this.buildTree(bones, objects)

        return {
            time: time || 0,
            pieces: objects
        }

        // console.log(bones)
        // console.log(objects[1])

        // var frameInfo = timeline[mainKeyFrame.key];
        // console.log(frameInfo);
        // var obj=mainline[idx]
        // timeline=timelineList[obj.timeline]
        //frameinfo = timeline[obj.key]
        // frameinfo + parentFrameinfo + parentParentFrameInfo + ....
    },

    buildTree: function(bones, objects) {
        var root = null;
        bones.forEach(function(node) {
            if (node.parent !== null) {
                bones[node.parent].children.push(node);
            } else {
                root = node;
            }
        });
        objects.forEach(function(node) {
            if (node.parent !== null) {
                bones[node.parent].children.push(node);
            }
        });

        function _dig(node) {
            var children = node.children;
            children.forEach(function(child) {
                // console.log(node.scaleX,node.scaleY,child.scaleX,child.scaleY)
                child.scaleX *= node.scaleX;
                child.scaleY *= node.scaleY;
                var cos = Math.cos(node.rotation),
                    sin = Math.sin(node.rotation);
                child.x *= node.scaleX;
                child.y *= node.scaleY;
                var x = child.x * cos - child.y * sin;
                var y = child.x * sin + child.y * cos;
                // x*=node.scaleX;
                // y*=node.scaleY;

                child.x = node.x + x // * node.scaleX;
                child.y = node.y + y // * node.scaleY;
                child.rotation += node.rotation;
                if (child.children) {
                    _dig(child);
                }
            });
        }
        if (root && root.children) {
            _dig(root);
        }
        // console.log(root)
        return root;
    }
};
