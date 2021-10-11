enum Keys {
    key_1,

    key_2,

    key_3,

    key_A,

    key_4,

    key_5,

    key_6,

    key_B,

    key_7,

    key_8,

    key_9,
    
    key_C,

    key_MUL,

    key_0,

    key_HASH,

    key_D
}
enum EnumPressed {
    //% block="is"
    is,
    
    //% block="is not"
    isNot
}
//% color=#D400D4 weight=111 icon="\uf192"
namespace input {
    let pinBinds = [[0, 1, 2, 5], [8, 11, 13, 14]]
    const not = (bool: boolean) => (!(bool))
    //% block="set pin binds to: rows: $rows, columns: $columns"
    export function editPins (rows: number[], columns: number[]) {
        pinBinds = [rows, columns]
    }
    //% block="$key is pressed"
    export function isKeyPressed (key: Keys) {
        return pins.digitalReadPin(pinBinds[0][((key + 1) % 4) - 1]) + pins.digitalReadPin(pinBinds[1][key % 4]) == 2;
    }
    //% block="when $key $pressed pressed $code";
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
}