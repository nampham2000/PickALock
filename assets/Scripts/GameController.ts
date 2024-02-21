// import { _decorator, Animation, cclegacy, Collider2D, Component, Contact2DType, director, EventKeyboard, EventTouch, find, Input, input, IPhysics2DContact, KeyCode, log, misc, Node, randomRange, Sprite, SpriteFrame, sys, tween, UIOpacity, v2, v3, Vec2, Vec3 } from 'cc';
// import { GameModel } from './GameModel';
// import { GameView } from './GameView';
// import { PandelSystem } from './PandelSystem';
// import { Constants } from './Data/Constants';
// import { AudioController } from './AudioController';
// import { GameCenterController } from './GameCenterController/GameCenterController';
// const { ccclass, property } = _decorator;

// export type BackgroundData = {
//     spriteFrame: SpriteFrame;
//     animationClip: string;
//     checkShape: number;
// }

// let matchId: string;

// @ccclass('GameController')
// export class GameController extends Component {
//     @property(GameModel)
//     private GameModel: GameModel
//     @property(GameView)
//     private GameView: GameView
//     @property(PandelSystem)
//     private PandelSystem: PandelSystem
//     @property(AudioController)
//     private AudioController: AudioController;
//     @property(GameCenterController)
//     private gameCenter: GameCenterController;

//     private LevelCount: number = 1;
//     private Level: number = 1;
//     private angle: number;
//     private gameClient;
//     private isCreated: boolean = true;
//     private check: boolean = false;
//     private count: number = 1;
//     private temp: number = 0;
//     private checkin: boolean = false;
//     private previousPosition: Vec3 = new Vec3();
//     private textCheat: string;
//     private scoreManager: Boolean = false;
//     private countrotation: number = 0;
//     private Basic;
//     private dx;
//     private dy;
//     private newposition;
//     @property(Node)
//     private LockSprite: Node;
//     @property(SpriteFrame)
//     private LockSprite1: SpriteFrame;
//     @property(SpriteFrame)
//     private LockSprite2: SpriteFrame;
//     @property(PandelSystem)
//     private pandelSystem: PandelSystem;
//     checksss = true;

//     private CheckShape1: BackgroundData = {
//         spriteFrame: new SpriteFrame,
//         animationClip: '',
//         checkShape: 0
//     };


//     protected start(): void {
//         this.PandelSystem.speed = 0;
//         // this.checksss = false;
//         if (Constants.dataUser.highScore) {
//             this.GameView.Bestscore.string = `BEST: ${Constants.dataUser.highScore}`;
//         } else {
//             this.GameView.Bestscore.string = '0';
//         }
//         // this.Basic = this.getRandomCharacterSprite();
//         // this.LockSprite.getComponent(Sprite).spriteFrame = this.Basic.spriteFrame;

//         // this.CheckShape1.checkShape = this.Basic.checkShape;
//     }

//     protected onLoad(): void {
//         // this.gameCenter.startMatch(() => {
//             // this.checksss = false;
//             // this.Basic = this.getRandomCharacterSprite();
//             this.cheatScore();
//             input.on(Input.EventType.TOUCH_START, this.changDirection, this);
//             if (!this.GameView.Tap.node.active) {
//                 this.GameView.Tap.node.active = true;
//             }
//             this.PandelSystem.speed = 0;
//             this.HandleAudioStorage();
//             this.LevelCount = this.Level;
//             const collider = this.GameModel.Pandel.getComponent(Collider2D)
//             if (collider) {
//                 collider.on(Contact2DType.BEGIN_CONTACT, this.onCollision, this);
//             }
//             this.blinkText();
//             if (Constants.dataUser.highScore) {
//                 this.GameView.Bestscore.string = `BEST: ${Constants.dataUser.highScore}`;
//             } else {
//                 this.GameView.Bestscore.string = '0';
//             }
//         // });
//     }



//     protected update(deltaTime: number): void {
//         // if (this.checksss === false) {
//         //     this.pandelSystem.speed = 0;
//         // }

//         // if ((this.CheckShape1.checkShape === 1 || this.CheckShape1.checkShape === 0) && this.checksss) {
//         //     this.pandelSystem.speed = 120;
//         //     this.pandelSystem.moveCircle(deltaTime);
//         // }

//         // if (this.CheckShape1.checkShape === 2 && this.checksss) {
//         //     this.pandelSystem.speed = 100;
//         //     this.pandelSystem.moveAlongSquarePath(deltaTime);
//         // }

//         // this.GameView.LevelCount.string = this.LevelCount.toString();
//         // if (this.scoreManager) {
//         //     this.GameView.Level.string = 'LEVEL: ' + this.Level.toString();
//         //     this.GameView.Bestscore.string = `BEST: ${Constants.dataUser.highScore}`;
//         // }
//         // if (this.check === true) {
//         //     if (this.calculateDistance() > 45 && this.calculateDistance() < 55) {
//         //         this.pandelSystem.speed = 0;
//         //         this.PandelSystem.Speed = 0;
//         //         if (this.temp === 0) {
//         //             this.checksss = false;
//         //             this.checkgameover();
//         //         }
//         //         this.temp++
//         //         this.saveBestScore();
//         //     }
//         // }
//         this.GameView.LevelCount.string = this.LevelCount.toString();
//         if (this.scoreManager) {
//             this.GameView.Level.string = 'LEVEL: ' + this.Level.toString();
//             this.GameView.Bestscore.string = `BEST: ${Constants.dataUser.highScore}`;
//         }
//         if(this.check===true)
//         {
//             if(this.calculateDistance()>30&&this.calculateDistance()<40)
//             {
//                 this.PandelSystem.Speed=0;
//                 if(this.temp===0)
//                 {
//                     this.checkgameover();
//                 }
//                 this.temp++
//                 this.saveBestScore();
//             }
//         }
//         this.GameView.Bestscore.string = `BEST: ${Constants.dataUser.highScore}`; 
//     }

//     private calculateDistance(): number {
//         const pandelPosition = this.GameModel.Pandel.position;
//         const dotPosition = this.GameModel.Dot.position;
//         const dx = dotPosition.x - pandelPosition.x;
//         const dy = dotPosition.y - pandelPosition.y;
//         const distance = Math.sqrt(dx * dx + dy * dy);
//         return distance;
//     }

//     // private changDirection(event: EventTouch): void {
//     //     this.checksss = true;
//     //     this.PandelSystem.speed = 70;
//     //     this.count++;
//     //     this.GameView.Tap.node.active = false;
//     //     this.PandelSystem.Direction = this.PandelSystem.Direction * -1;
//     //     this.pandelSystem.direct = - this.pandelSystem.direct;


//     //     const distance = this.calculateDistance();
//     //     const collisionThreshold = 30;
//     //     if (distance <= collisionThreshold) {

//     //         this.check = false;
//     //         this.countrotation++;
//     //         if (this.countrotation % 2 === 0) {
//     //             this.PandelSystem.Check = true;
//     //         }
//     //         else {
//     //             this.PandelSystem.Check = false;
//     //         }

//     //         this.ramdombdot();
//     //         this.previousPosition = this.newposition;
//     //         this.LevelCount--;
//     //         this.AudioController.onAudio(0);
//     //         this.checkLevel();
//     //     } else {
//     //         this.checksss = false;
//     //         //   this.check = true;
//     //         if (this.count > 2) {
//     //             this.PandelSystem.Speed = 0;
//     //             this.pandelSystem.speed = 0;
//     //             this.checkgameover();
//     //             this.saveBestScore();
//     //         }
//     //     }
        
//     // }

//     private changDirection(event:EventTouch):void
//     {
//         this.PandelSystem.Speed=2;
//         this.count++
//         this.GameView.Tap.node.active=false;
//         this.PandelSystem.Direction=this.PandelSystem.Direction*-1;
//         const distance = this.calculateDistance();
//         const collisionThreshold = 20; 
//         if (distance <= collisionThreshold) {
//         this.check=false;
//         const radius = 147.928; 
//         const center = this.PandelSystem.PivotPoint; 
//         const minDistance = 35;
//         let angle = Math.random() * Math.PI * 2;
//         const offsetX = radius * Math.cos(angle);
//         const offsetY = radius * Math.sin(angle);
//         let newPosition = new Vec3(center.x + offsetX, center.y + offsetY);
//         const dx = newPosition.x - this.GameModel.Pandel.position.x;
//         const dy = newPosition.y - this.GameModel.Pandel.position.y;
//         let distance1 = Math.sqrt(dx * dx + dy * dy);
//         if (distance1 < minDistance) {
//             angle += Math.PI / 4; 
//             const offsetX = radius * Math.cos(angle);
//             const offsetY = radius * Math.sin(angle);
//             newPosition=new Vec3(center.x + offsetX, center.y + offsetY);
//             const dx = newPosition.x - this.GameModel.Pandel.position.x;
//             const dy = newPosition.y - this.GameModel.Pandel.position.y;
//             distance1 = Math.sqrt(dx * dx + dy * dy);
//         }
//         this.GameModel.Dot.setPosition(newPosition);
//         this.GameModel.Dot.getComponent(Collider2D).apply();
//         this.previousPosition = newPosition;
//         this.LevelCount--
//         this.AudioController.onAudio(0);
//         this.checkLevel()
//         }else
//         {
//             if(this.count>2)
//             {
//                 this.PandelSystem.Speed=0;
//                 this.checkgameover();
//                 this.saveBestScore();
//             }
//         }
//     }
//     private randomPositionOnSquarePath(speed: number): Vec3 {
//         let v3 = this.pandelSystem.getCoordinate(speed);
//         return new Vec3(v3.x, v3.y, 1);
//     }

//     // private ramdombdot() {
//     //     const radius = 147.928;
//     //     const center = this.PandelSystem.PivotPoint;
//     //     const minDistance = 70;
//     //     let angle = Math.random() * Math.PI * 2;
//     //     if (this.CheckShape1.checkShape === 0 || this.CheckShape1.checkShape === 1) {
//     //         const offsetX = radius * Math.cos(angle);
//     //         const offsetY = radius * Math.sin(angle);
//     //         this.newposition = new Vec3(center.x + offsetX, center.y + offsetY);
//     //         this.dx = this.newposition.x - this.GameModel.Pandel.position.x;
//     //         this.dy = this.newposition.y - this.GameModel.Pandel.position.y;
//     //     }
//     //     if (this.CheckShape1.checkShape === 2) {
            
//     //         const randomAngle = Math.random() * 360;
//     //         const randomPosition = this.randomPositionOnSquarePath(randomAngle);
//     //         this.dx = randomPosition.x - this.GameModel.Pandel.position.x;
//     //         this.dy = randomPosition.y - this.GameModel.Pandel.position.y;
//     //         this.newposition = new Vec3(randomPosition.x * 150, randomPosition.y * 150, 1);
//     //     }
//     //     let distance1 = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
//     //     if (distance1 < minDistance) {
//     //         if (this.CheckShape1.checkShape === 0 || this.CheckShape1.checkShape === 1) {
//     //             angle += 30;
//     //             const offsetX = radius * Math.cos(angle);
//     //             const offsetY = radius * Math.sin(angle);
//     //             this.newposition = new Vec3(center.x + offsetX, center.y + offsetY,);
//     //             this.dx = this.newposition.x - this.GameModel.Pandel.position.x;
//     //             this.dy = this.newposition.y - this.GameModel.Pandel.position.y;
//     //             distance1 = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
//     //         }
//     //         if (this.CheckShape1.checkShape === 2) {
//     //             const randomAngle = Math.random() * 360;
//     //             const randomPosition = this.randomPositionOnSquarePath(randomAngle);
//     //             this.dx = randomPosition.x - this.GameModel.Pandel.position.x;
//     //             this.dy = randomPosition.y - this.GameModel.Pandel.position.y;
//     //             this.newposition = new Vec3(randomPosition.x * 150, randomPosition.y * 150, 1);
//     //             distance1 = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
//     //         }
//     //     }
//     //     // this.GameModel.Dot.setPosition(newPosition);
//     //     this.GameModel.Dot.setPosition(this.newposition);
//     //     this.GameModel.Dot.getComponent(Collider2D).apply();
//     // }

//     private randomPositionOnCirclePath(speed: number): Vec3 {

//         const radius = 147.928;
//         const center = this.PandelSystem.PivotPoint;
//         let angle = Math.random() * Math.PI * 2;
//         const offsetX = radius * Math.cos(angle);
//         const offsetY = radius * Math.sin(angle);
//         let newPosition = new Vec3(center.x + offsetX, center.y + offsetY);
//         const dx = newPosition.x - this.GameModel.Pandel.position.x;
//         const dy = newPosition.y - this.GameModel.Pandel.position.y;
//         return new Vec3(dx, dy);
//     }

//     private randomPositionOnVCPath(speed: number): Vec3 {
//         const x1 = 0;
//         const y1 = 0;
//         const radian = misc.degreesToRadians(this.angle);
//         const a = 100;
//         const x = a * Math.sqrt(2) * Math.cos(radian) / (Math.pow(Math.sin(radian), 2) + 1);
//         const y = a * Math.sqrt(2) * Math.cos(radian) * Math.sin(radian) / (Math.pow(Math.sin(radian), 2) + 1);
//         const newX = x1 + x;
//         const newY = y1 + y;
//         return new Vec3(newX, newY);
//     }

//     private getRandomCharacterSprite(): BackgroundData {
//         const backgroundData: BackgroundData[] = [
//             {
//                 spriteFrame: this.LockSprite1,
//                 animationClip: "Character1",
//                 checkShape: 0
//             },
//             {
//                 spriteFrame: this.LockSprite1,
//                 animationClip: "Character1",
//                 checkShape: 1
//             },
//             {
//                 spriteFrame: this.LockSprite2,
//                 animationClip: "Character1",
//                 checkShape: 2
//             },
//         ];
//         const randomIndex = Math.floor(Math.random() * backgroundData.length);
//         return backgroundData[randomIndex];
//     }



//     private onCollision(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact): void {
//         if (otherCollider.tag === 1) {
//             this.check = true;
//         }
//     }

//     private blinkText(): void {
//         const blinkDuration = 1;
//         tween(this.GameView.Tap.getComponent(UIOpacity))
//             .repeatForever(
//                 tween()
//                     .set({ opacity: 255 })
//                     .to(blinkDuration, { opacity: 0 }, { easing: 'quadIn' })
//                     .to(blinkDuration, { opacity: 255 }, { easing: 'quadOut' })
//             )
//             .start()
//     }

//     //Call when start game
//     private offCheat(): void {
//         input.off(Input.EventType.KEY_DOWN, this.handleKeyDownCheat, this);
//     }

//     //Call when game over
//     private cheatScore(): void {
//         input.on(Input.EventType.KEY_DOWN, this.handleKeyDownCheat, this);
//     }

//     private handleKeyDownCheat(event: EventKeyboard): void {
//         //reset if press O
//         if (event.keyCode === KeyCode.KEY_O) this.textCheat = '';

//         //get text input 
//         this.textCheat += String.fromCharCode(event.keyCode);

//         if (this.textCheat.includes('ONECHAINCHEAT')) {
//             let scoreStr = prompt('Score');

//             while (isNaN(parseInt(scoreStr))) {
//                 alert('Not valid');
//                 scoreStr = prompt('Score');
//             };
//             let score = parseInt(scoreStr);
//             alert(score);
//             this.textCheat = '';
//             //handle score ui
//             let highScore = score > Constants.dataUser.highScore ? score : Constants.dataUser.highScore;
//             this.GameView.Level.string = `LEVEL:${score}`;
//             this.GameView.Bestscore.string = `BEST: ${highScore}`;
//         }
//     }

//     private checkLevel(): void {
//         if (this.LevelCount === 0) {
//             // this.checksss = false;
//             this.PandelSystem.speed = 0;
//             this.scoreManager = true;
//             this.GameView.LockHatUp.play();
//             this.AudioController.onAudio(2);
//             input.off(Input.EventType.TOUCH_START, this.changDirection, this);
//             this.scheduleOnce(() => {
//                 this.Level++;
//                 this.LevelCount = this.Level;
//                 // this.Basic = this.getRandomCharacterSprite();
//                 // this.LockSprite.getComponent(Sprite).spriteFrame = this.Basic.spriteFrame;
//                 // this.CheckShape1.checkShape = this.Basic.checkShape;
//                 // this.ramdombdot();
//                 // this.PandelSystem.speed=70;
//                 // this.checksss = true;
//                 this.PandelSystem.Speed=2;
//                 input.on(Input.EventType.TOUCH_START, this.changDirection, this)
//             }, 1.2);
//         }
//     }

//     private async checkgameover(): Promise<void> {
//         this.PandelSystem.speed = 0;
//         this.GameView.Level.string = 'LEVEL: ' + this.Level.toString();
//         input.off(Input.EventType.TOUCH_START, this.changDirection, this);
//         input.off(Input.EventType.TOUCH_START);
//         if (this.isCreated) {
//             this.isCreated = false;

//             this.gameCenter.completeMatch(() => {
//                 this.scheduleOnce(function () {
//                     director.loadScene('Main')
//                 }, 0.8);
//             }, { score: Math.floor(this.Level) });
//         }

//         this.GameView.Hatover.play();
//         this.GameView.LockHatUp.defaultClip = this.GameView.LockHatUp.clips[1]
//         this.GameView.LockHatUp.play();
//         this.AudioController.onAudio(1);
//         this.scheduleOnce(function () {
//             this.PandelSystem.speed = 0;
//         }, 0.09);
//     }

//     protected HandleAudioStorage(): void {
//         if (Constants.volumeGameStatic === null) {
//             Constants.volumeGameStatic = true;
//         }

//         if (Constants.volumeGameStatic === true) {
//             this.GameView.SoundBasic.node.active = true;
//             this.GameView.SoundMute.node.active = false;
//             this.AudioController.settingAudio(1);
//         }
//         else {
//             this.GameView.SoundBasic.node.active = false;
//             this.GameView.SoundMute.node.active = true;
//             this.AudioController.settingAudio(0);
//         }
//     }

//     protected onTouchOnAudio(): void {
//         Constants.volumeGameStatic = true;
//         this.AudioController.settingAudio(1);
//         this.GameView.SoundBasic.node.active = true;
//         this.GameView.SoundMute.node.active = false;
//     }

//     protected onTouchOffAudio(): void {
//         Constants.volumeGameStatic = false;
//         this.AudioController.settingAudio(0);
//         this.GameView.SoundBasic.node.active = false;
//         this.GameView.SoundMute.node.active = true;
//     }

//     private saveBestScore(): void {
//         Constants.dataUser.highScore = Constants.dataUser.highScore < this.Level ? this.Level : Constants.dataUser.highScore;
//     }
// }

import { _decorator, Animation, cclegacy, Collider2D, Component, Contact2DType, director, EventTouch, find, Input, input, IPhysics2DContact, Node, randomRange, sys, tween, UIOpacity, v2, v3, Vec3 } from 'cc';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
import { PandelSystem } from './PandelSystem';
import { Constants } from './Data/Constants';
import { AudioController } from './AudioController';
import { GameCenterController } from './GameCenterController/GameCenterController';
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
    @property(GameCenterController)
    private gameCenter: GameCenterController;

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
        this.gameCenter.startMatch(()=>{
            this.startMatchLog();
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
        });
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
        if (this.isCreated) {
            this.isCreated = false;

            this.gameCenter.completeMatch(()=>{
                this.scheduleOnce(function() {
                    director.loadScene('Main')
            }, 0.8);
            }, { score: Math.floor(this.Level)});
        }
        
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
    
    public startMatchLog():void{
        let id =setInterval(()=>{
            if(this.checkinover){
                clearInterval(id);
                return;
            }
            this.gameCenter.logMatch({score:this.Level})
        },1000)
    }
}



