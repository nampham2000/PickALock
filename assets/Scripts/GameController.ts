
import { _decorator, Animation, cclegacy, Collider2D, Component, Contact2DType, director, EventTouch, find, Input, input, IPhysics2DContact, Node, randomRange, sys, tween, UIOpacity, v2, v3, Vec3 } from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
import { PandelSystem } from './PandelSystem';
import { Constants } from './Data/Constants';
import { AudioController } from './AudioController';

const { ccclass, property } = _decorator;

let matchId: string;
@ccclass('GameController')
export class GameController extends Component {
    @property(GameModel)
    private GameModel:GameModel
    @property(GameView)
    private GameView:GameView
    @property(PandelSystem)
    private PandelSystem:PandelSystem
    @property(AudioController)
    private AudioController:AudioController;

    private LevelCount:number=1;
    private Level:number=1;
    private angle:number;
    private gameClient;
    private isCreated: boolean = true;
    private check:boolean=false;
    private count:number=1;
    private temp:number=0;
    private checkin:boolean=false;
    private checkinover:boolean=false;
    private previousPosition;

    protected start(): void {
        this.PandelSystem.Speed=0;
    }

    protected onLoad(): void {
            input.on(Input.EventType.TOUCH_START,this.changDirection,this);
            if(!this.GameView.Tap.node.active)
            {
                this.GameView.Tap.node.active=true;
            }
            this.PandelSystem.Speed=0;
            this.HandleAudioStorage();
            this.LevelCount=this.Level;
            const collider=this.GameModel.Pandel.getComponent(Collider2D)
            if(collider)
            {
                collider.on(Contact2DType.BEGIN_CONTACT,this.onCollision,this);
            }
            this.blinkText();
    }

    protected update(dt: number): void {
        this.GameView.LevelCount.string=this.LevelCount.toString();
        this.GameView.Level.string='LEVEL: '+this.Level.toString();
        if(this.check===true)
        {
            if(this.calculateDistance()>50&&this.calculateDistance()<60)
            {
                this.PandelSystem.Speed=0;
                if(this.temp===0)
                {
                    this.checkgameover();
                }
                this.temp++
                this.saveBestScore();
            }
        }
        this.GameView.Bestscore.string = `BEST: ${Constants.dataUser.highScore}`; 
    }

    private calculateDistance(): number {
        const pandelPosition = this.GameModel.Pandel.position;
        const dotPosition = this.GameModel.Dot.position;
        const dx = dotPosition.x - pandelPosition.x;
        const dy = dotPosition.y - pandelPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance;
    }

    private changDirection(event:EventTouch):void
    {
        this.PandelSystem.Speed=2;
        this.count++
        this.GameView.Tap.node.active=false;
        this.PandelSystem.Direction=this.PandelSystem.Direction*-1;
        const distance = this.calculateDistance();
        const collisionThreshold = 30; 
        if (distance <= collisionThreshold) {
        this.check=false;
        const radius = 147.928; 
        const center = this.PandelSystem.PivotPoint; 
        const minDistance = 80;
        let angle = Math.random() * Math.PI * 2;
        const offsetX = radius * Math.cos(angle);
        const offsetY = radius * Math.sin(angle);
        let newPosition = new Vec3(center.x + offsetX, center.y + offsetY);
        const dx = newPosition.x - this.GameModel.Pandel.position.x;
        const dy = newPosition.y - this.GameModel.Pandel.position.y;
        let distance1 = Math.sqrt(dx * dx + dy * dy);
        if (distance1 < minDistance) {
            angle += Math.PI / 3; 
            const offsetX = radius * Math.cos(angle);
            const offsetY = radius * Math.sin(angle);
            newPosition=new Vec3(center.x + offsetX, center.y + offsetY);
            const dx = newPosition.x - this.GameModel.Pandel.position.x;
            const dy = newPosition.y - this.GameModel.Pandel.position.y;
            distance1 = Math.sqrt(dx * dx + dy * dy);
        }
        this.GameModel.Dot.setPosition(newPosition);
        this.GameModel.Dot.getComponent(Collider2D).apply();
        this.previousPosition = newPosition;
        this.LevelCount--
        this.AudioController.onAudio(0);
        this.checkLevel()
        }else
        {
            if(this.count>2)
            {
                this.PandelSystem.Speed=0;
                this.checkgameover();
                this.checkinover=true;
                this.saveBestScore();
            }
        }
    }

    private onCollision(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact):void
    {
        if(otherCollider.tag===1)
        {
            this.check=true;
        }
    }

    private blinkText():void {
        const blinkDuration = 1; 
        tween(this.GameView.Tap.getComponent(UIOpacity))
            .repeatForever(
                tween()
                .set({ opacity: 255 }) 
                .to(blinkDuration, { opacity: 0 }, { easing: 'quadIn' }) 
                .to(blinkDuration, { opacity: 255 }, { easing: 'quadOut' })
            )
       .start()
     }
     
    private checkLevel():void
    {
        if(this.LevelCount===0)
        {
            this.GameView.LockHatUp.play();
            this.AudioController.onAudio(2);
            this.PandelSystem.Speed=0;
            input.off(Input.EventType.TOUCH_START,this.changDirection,this);
            this.scheduleOnce(function() {
                this.Level++
                this.LevelCount=this.Level
                this.PandelSystem.Speed=2;
                input.on(Input.EventType.TOUCH_START,this.changDirection,this)
            }, 1.2);
        }
    }

    private async checkgameover():Promise<void>
    {
        this.PandelSystem.speed = 0;
        input.off(Input.EventType.TOUCH_START,this.changDirection,this)
                this.scheduleOnce(function() {
                    director.loadScene('Main')
            }, 0.8);
        this.GameView.Hatover.play();
        this.GameView.LockHatUp.defaultClip=this.GameView.LockHatUp.clips[1]
        this.GameView.LockHatUp.play();
        this.AudioController.onAudio(1);
        this.scheduleOnce(function() {
            this.PandelSystem.Speed=0;
        }, 0.09);  
    }

    protected HandleAudioStorage(): void {
        if (Constants.volumeGameStatic === null) {
            Constants.volumeGameStatic = true;
        }

        if(Constants.volumeGameStatic === true){
            this.GameView.SoundBasic.node.active=true;
            this.GameView.SoundMute.node.active=false;
            this.AudioController.settingAudio(1);
        }
        else{
            this.GameView.SoundBasic.node.active=false;
            this.GameView.SoundMute.node.active=true;
            this.AudioController.settingAudio(0);
        }
    }

    protected onTouchOnAudio(): void {
        Constants.volumeGameStatic = true;
        this.AudioController.settingAudio(1);
        this.GameView.SoundBasic.node.active=true;
        this.GameView.SoundMute.node.active=false;
    }

    protected onTouchOffAudio(): void {
        Constants.volumeGameStatic = false;
        this.AudioController.settingAudio(0);
        this.GameView.SoundBasic.node.active=false;
        this.GameView.SoundMute.node.active=true;
    }

    private saveBestScore():void
    {
        Constants.dataUser.highScore =  Constants.dataUser.highScore < this.Level ? this.Level :  Constants.dataUser.highScore;
    }
    
}



