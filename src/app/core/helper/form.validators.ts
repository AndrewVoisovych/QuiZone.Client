import { FormControl, FormGroup } from '@angular/forms';
export class FormValidators {


    static validateEmail(c: FormControl) {
        const email = c.value;

        if (email.length > 8) {
            if (email.includes('@')) {
                if (email.includes('.')) {
                    const firstPartEmail = email.split('@', 2);
                    const twoPartEmail = firstPartEmail[1].split('.', 2);

                    if (email === 'test@gmail.com' || email === 'test@test.com') {
                        return { validateEmail: true };
                    }

                    if (
                        firstPartEmail[0] === twoPartEmail[0] &&
                        firstPartEmail[0] === twoPartEmail[1] &&
                        twoPartEmail[0] === twoPartEmail[1]
                    ) {
                        return { validateEmail: true };
                    }
                }
            }
        }
        return null;
    }


    static validateName(c: FormControl) {
        const name = c.value;
        const dublicate = Array(name.length + 1).join(name[0]);

        if (name === dublicate) {
            return {
                validateName: true
            };
        }
        return null;
    }

    static validatePassword(c: FormControl) {
        const password = c.value;
        if (password.length > 5) {
            if (
                password.length < 10 && (
                    password.includes('123456') ||
                    password.includes('654321') ||
                    password.includes('qwerty') ||
                    password.includes('password'))
            ) {

                return { validatePassword: true };
            }
            const dublicate = Array(password.length + 1).join(password[0]);
            if (dublicate === password) {
                return { validatePassword: true };
            }
        }

        return null;
    }



    static validatePasswords(passwordForm: string, confirmForm: string) {
        return (group: FormGroup): { [key: string]: any } => {
            const password = group.controls[passwordForm].value;
            const confirm = group.controls[confirmForm].value;

            if (
                password !== '' &&
                confirm !== '' &&
                password.length > 5 &&
                confirm.length > 5
            ) {
                if (password !== confirm) {
                    return {
                        validatePasswords: true
                    };
                }
            }
        };
    }
}
