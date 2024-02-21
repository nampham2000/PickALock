import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {

    @property({
        type:Node,
        tooltip: 'Pandel Node'
    })
    private pandel:Node;
    @property({
        type:Node,
        tooltip: 'Dot Node'
    })
    private dot:Node;

    public get Pandel() : Node {
        return this.pandel
    }
    public set PandelValue(v : Node) {
        this.pandel = v;
    }

    public get Dot() : Node
    {
        return this.dot
    }
    public set DotValue(v : Node) {
        this.dot = v;
    }

}


