import { _decorator, CCBoolean, CCInteger, Collider2D, Component, Contact2DType, EventTouch, Input, input, IPhysics2DContact, log, misc, Node, Quat, SpriteFrame, tween, Vec2, Vec3 } from 'cc';
// import { BackgroundData, GameController } from './GameController';
const { ccclass, property } = _decorator;

@ccclass('PandelSystem')
export class PandelSystem extends Component {

    @property({
        type: CCInteger,
        tooltip: 'Speed Spin'
    })
    public speed: number =200;

    @property({
        type: CCInteger,
        tooltip: 'Direction Value'
    })
    private direction: number = 1;
    public get Direction(): number {
        return this.direction;
    }
    public set Direction(value: number) {
        this.direction = value;
    }

    public get Speed(): number {
        return this.speed;
    }
    public set Speed(value: number) {
        this.speed = value;
    }

    private pivotPoint = new Vec3(0, 0)

    public get PivotPoint(): Vec3 {
        return this.pivotPoint;
    }

    @property({
        type: CCBoolean,
        tooltip: 'Direction Value'
    })
    private check: Boolean = true;
    public get Check(): Boolean {
        return this.check;
    }
    public set Check(value: Boolean) {
        this.check = value;
    }
    private directionSquare: number = 50;
    private speedSquare: number;
    // private node: Node;
    public angle: number = 0;
    public startPos: Vec2 = new Vec2(-150, -150);
    public direct: number = 1;
    private rotationAngle: number;
    // private CheckShape1:BackgroundData = {
    //     spriteFrame: new SpriteFrame,
    //     animationClip: '',
    //     checkShape: 0
    // };
    
    private randomNumber: number;

    // protected start(): void {
    //     console.log(Math.tan(45 * (Math.PI / 180)));

    //     // input.on(Input.EventType.TOUCH_START, () => {
    //     //     this.direct = -this.direct;
    //     // })
        
        
        
    // }
    protected update(deltaTime: number): void {
        // this.randomNumber = GameController.CheckShape1.checkShape;
        // console.log(this.randomNumber);
        // if(this.randomNumber===1||this.randomNumber===0)
        // {
        //     this.moveCircle(deltaTime);
        // }
        // if(this.randomNumber===2){

        //     this.moveAlongSquarePath(deltaTime);
        // }
        // this.moveTriangle(deltaTime);
        // this.movingHeart(deltaTime);
        // this.movingVC(deltaTime);
        this.moveCircle(deltaTime);
    }


    public moveCircle(deltaTime: number): void {
        const offset = Vec3.subtract(new Vec3(), this.node.position, this.pivotPoint);
        this.rotationAngle = this.direction * this.Speed * deltaTime;
        const rotationQuat = new Quat();
        Quat.fromAxisAngle(rotationQuat, Vec3.FORWARD, this.rotationAngle);
        Vec3.transformQuat(offset, offset, rotationQuat);
        const currentRotation = this.node.getRotation();
        const newRotation = new Quat();
        this.node.setRotation(Quat.multiply(newRotation, rotationQuat, currentRotation));
        this.node.setPosition(Vec3.add(new Vec3(), this.pivotPoint, offset));
        this.node.getComponent(Collider2D).apply();
         // Tính toán vị trí mới dựa trên góc và bán kính
        //  const radius = 147.928; 
        //  const radians = misc.degreesToRadians(this.angle);
        //  const x = radius * Math.cos(radians);
        //  const y = radius * Math.sin(radians);
 
       
        //  this.node.setPosition(x, y);
 
        //  // Tăng góc để di chuyển tiếp theo đường tròn
        //  this.angle +=  this.direction *this.speed * deltaTime;
    }

    public  moveAlongSquarePath(deltaTime: number): void {
        this.angle += this.direct * deltaTime * this.speed;
        let v2 = this.getCoordinate(this.angle % 360);
        this.node.setPosition(v2.x * 150, v2.y * 150);
    }

    public getCoordinate(angle: number): Vec2 {
        let alpha = angle < 0 ? 360 + angle : angle;

        let x: number = 1;
        let y: number = Math.tan(alpha * (Math.PI / 180));

        if (alpha >= 45 && alpha <= 135) {
            x = 1 / Math.tan(alpha * (Math.PI / 180)); y = 1;
        }

        if (alpha >= 135 && alpha <= 225) {
            x = -1; y = -Math.tan(alpha * (Math.PI / 180));
        }

        if (alpha >= 225 && alpha <= 315) {
            x = -1 / Math.tan(alpha * (Math.PI / 180)); y = -1;
        }
        return new Vec2(x, y);
    }


    private moveTriangle(deltaTime: number): void {
        const sideLength = 300;
        const x = -150;
        const y = -150;
        this.angle += this.speed * deltaTime;
        const points = [
            { x: x, y: y },
            { x: x + sideLength, y: y },
            { x: x + sideLength / 2, y: y + (Math.sqrt(4) / 2) * sideLength }
        ];
        const edgeIndex = Math.floor(this.angle / 120) % 3;
        const startX = points[edgeIndex].x;
        const startY = points[edgeIndex].y;
        const endX = points[(edgeIndex + 1) % 3].x;
        const endY = points[(edgeIndex + 1) % 3].y;
        const progress = (this.angle % 120) / 120;
        const newX = (startX + progress * (this.startPos.x - startX));
        const newY = (startY + progress * (this.startPos.y - startY));
        this.node.setPosition(new Vec3(-newX, -newY));
    }

    private movingHeart(deltaTime): void {
        const x1 = 0;
        const y1 = 0;
        this.speed = -100;
        this.angle += this.speed * deltaTime;
        const radian = misc.degreesToRadians(this.angle);
        const a = 18 * -0.6;
        const b = 18 * -0.6;
        const x = a * (13 * Math.pow(Math.sin(radian), 3));
        // const y = -b * (13 * Math.cos(radian) - 5 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian));
        const y = -b * (13 * Math.cos(radian) - 2 * Math.cos(2 * radian) - 2 * Math.cos(3 * radian) - Math.cos(4 * radian));

        const newX = x1 + x;
        const newY = y1 + y;
        this.node.setPosition(new Vec3(newX, newY));
    }

    // private movingVC(deltaTime): void {
    //     const x1 = 0;
    //     const y1 = 0;
    //     this.speed = 50;
    //     this.angle += this.speed * deltaTime*this.direction;
    //     const radian = misc.degreesToRadians(this.angle);
    //     const a = 125;
    //     const x = a * Math.sqrt(1.7) * Math.cos(radian) / (Math.pow(Math.sin(radian), 2) + 1);
    //     const y = a * Math.sqrt(1.7) * Math.cos(radian) * Math.sin(radian) / (Math.pow(Math.sin(radian), 2) + 0.25);
    //     const newX = x1 + x;
    //     const newY = y1 + y;
    //     this.node.setPosition(new Vec3(newX, newY));
    // }
}








