enum Keys {
    //% block="1"
    key_1,

    //% block="2"
    key_2,

    //% block="3"
    key_3,

    //% block="A"
    key_A,

    //% block="4"
    key_4,

    //% block="5"
    key_5,

    //% block="6"
    key_6,

    //% block="B"
    key_B,

    //% block="7"
    key_7,

    //% block="8"
    key_8,

    //% block="9"
    key_9,
    
    //% block="C"
    key_C,

    //% block="*"
    key_MUL,

    //% block="0"
    key_0,

    //% block="#"
    key_HASH,

    //% block="D"
    key_D
}
enum EnumPressed {
    //% block="is"
    is,
    
    //% block="is not"
    isNot
}
//% color=#D8BFD8 weight=111 icon="\uf11c"
namespace keypad {
    let pinBinds = [[0, 1, 2, 8], [13, 14, 15, 16]]
    function not (bool: boolean) {
        return !bool
    }
    //% block="set pin binds to: rows: $rows, columns: $columns"
    export function editPins (rows: number[], columns: number[]) {
        pinBinds = [rows, columns]
    }
    //% block="$key is pressed"
    export function isKeyPressed (key: Keys) {
        let pin = pins.digitalReadPin(pinBinds[0][((key + 1) % 4) - 1])
        pins.digitalWritePin(pin, 1)
        let bool = pins.digitalReadPin(pinBinds[1][key % 4]) == 1;
        pins.digitalWritePin(pin, 0);
        return bool;
    }
    //% block="when $key $pressed pressed";
    export function whenKey (key: Keys, pressed: EnumPressed, code: () => void) {
        basic.forever(function () {
            if (pressed == 0 && isKeyPressed(key)) {
                code()
                while (isKeyPressed(key)) {}
            } else if (pressed == 1 && not(isKeyPressed(key))) {
                code()
                while (not(isKeyPressed(key))) {}
            }
        })
    }
    // block="when a key is pressed"
    // draggableParameters=reporter
    // export function anyKeyPressed (handler: (key: number) => void) {
        
    // }
}