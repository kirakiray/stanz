(() => {
    let tester = expect(15, 'normal test');

    let a = stanz({
        val: "I am a",
        d: {
            val: "I am d",
            selected: 2,
            t: [111, 222, 333, 444]
        },
        0: {
            v: "I am 0",
            val: "0000",
            selected: 1,
            ha: [333]
        },
        1: {
            val: "11111111",
            selected: "0",
            0: {
                val: "am I childs 0?",
                selected: 0
            }
        }
    });

    let b = stanz({
        val: "I am b",
        obj: {
            val: "b val"
        },
        aMoveObj: {
            val: "I am move Obj"
        }
    });

    let mobj = b.aMoveObj;

    a.push(b);

    tester.ok(a[1][0].root == a, "root ok");

    let c = stanz(["111", "222", "333"]);
    c.add("444");
    tester.ok(c.length == 4, "add ok 1");
    c.add("333");
    tester.ok(c.length == 4, "add ok 2");
    c.delete("333");
    tester.ok(c.length == 3, "delete ok");

    // 从别处拿走
    a.moveObj = b.aMoveObj;
    tester.ok(!b.aMoveObj, "move's delete ok");
    tester.ok(a.moveObj.string === mobj.string, "move's add is equal");

    // 获取next
    tester.ok(a[1].next === a[2], "next ok");
    tester.ok(a[1].prev === a[0], "prev ok");

    // 添加新key
    a.unshift({
        val: "new obj"
    });
    tester.ok(a[1].index == 1, "index ok");

    a[0].after({
        val: "I am after append"
    });

    tester.ok(a.length == 5, 'length ok');
    tester.ok(a[1].val == "I am after append", 'after ok');

    // 自己吃自己
    a.push(a.moveObj);
    tester.ok(a[5].string === mobj.string, "move's add is equal 2");
    tester.ok(a.length == 6, 'length ok2');

    // point set 功能
    a["d.val"] = "change d val";
    tester.ok(a.d.val === "change d val", "point set ok");

    let ele = document.createElement("div");
    ele.innerHTML = "test ele";
    a.ele = ele;
    a.eleObj = {
        ele
    };

    // 断定是否正确
    tester.ok(a.eleObj.ele === ele, "element set ok");

})();