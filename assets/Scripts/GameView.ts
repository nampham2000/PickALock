import { _decorator, Animation, AudioSource, Button, Component, Label, LabelComponent, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({
        type:Label,
        tooltip: 'level Count Label'
    })
    private levelCount:Label;

    public get LevelCount() : Label {
        return this.levelCount
    }
    public set LevelCountValue(v : Label) {
        this.levelCount = v;
    }

    @property({
        type:Label,
        tooltip: 'Level Label'
    })
    private level:Label;

    public get Level() : Label {
        return this.level
    }
    public set LevelValue(v : Label) {
        this.level = v;
    }

    @property({
        type:Animation,
        tooltip: 'Lock Up Animation'
    })
    private lockHatUp:Animation;

    public get LockHatUp() : Animation {
        return this.lockHatUp
    }
    public set UpValue(v : Animation) {
        this.lockHatUp = v;
    }

    @property({
        type:Animation,
        tooltip: 'Hat Over Animation'
    })
    private hatOver:Animation

    public get Hatover() : Animation {
        return this.hatOver
    }
    public set Hatover(v : Animation) {
        this.hatOver = v;
    }

    @property({
        type:Label,
        tooltip: 'Tap Label'
    })
    private tap:Label;

    public get Tap() : Label {
        return this.tap
    }
    public set Tap(v : Label) {
        this.tap = v;
    }

    @property({
        type:Label,
        tooltip: 'Best Score Label'
    })
    private best:Label;

    public get Bestscore() : Label {
        return this.best
    }
    public set Bestscore(v : Label) {
        this.best = v;
    }

    @property({
        type:Button,
        tooltip: 'Sound Mute Button'
    })
    private soundmute:Button;

    public get SoundMute() : Button {
        return this. soundmute
    }
    public set SoundMutevalue(v : Button) {
        this. soundmute = v;
    }

    @property({
        type:Button,
        tooltip: 'Sound Basic Button'
    })
    private soundbasic:Button;

    public get SoundBasic() : Button {
        return this. soundbasic
    }
    public set SoundBasicvalue(v : Button) {
        this. soundbasic = v;
    }
}


