'use strict';
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
const db = require('../database');
const plugins = require('../plugins');
function default_1(Posts) {
    function toggleEndorse(type, pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parseInt(uid, 10) <= 0) {
                throw new Error('[[error:not-logged-in]]');
            }
            const isEndorsing = type === 'endorse';
            const [postData, hasEndorsed] = yield Promise.all([
                Posts.getPostFields(pid, ['pid', 'uid']),
                Posts.hasEndorsed(pid, uid),
            ]);
            if (isEndorsing && hasEndorsed) {
                throw new Error('[[error:already-endorsed]]');
            }
            if (!isEndorsing && !hasEndorsed) {
                throw new Error('[[error:already-unendorsed]]');
            }
            if (isEndorsing) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                yield db.sortedSetAdd(`uid:${uid}:endorsed`, Date.now(), pid);
            } else {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                yield db.sortedSetRemove(`uid:${uid}:endorsed`, pid);
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            yield db[isEndorsing ? 'setAdd' : 'setRemove'](
                `pid:${pid}:users_endorsed`,
                uid
            );
            yield plugins.hooks.fire(`action:post.${type}`, {
                pid: pid,
                uid: uid,
                owner: postData.uid,
                current: isEndorsing ? 'endorsed' : 'unendorsed',
            });
            return {
                post: postData,
                isEndorsed: isEndorsing,
            };
        });
    }
    Posts.hasEndorsed = function (pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (parseInt(uid, 10) <= 0) {
                return Array.isArray(pid) ? pid.map(() => false) : false;
            }
            if (Array.isArray(pid)) {
                const sets = pid.map((pid) => `pid:${pid}:users_endorsed`);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                const counts = yield db.setsCount(sets); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
                // The next line calls a function in a module that has not been updated to TS yet
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
                return counts.map((v) => v > 0); // eslint-disable-line @typescript-eslint/no-unsafe-call
            }
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            const count = yield db.setCount(`pid:${pid}:users_endorsed`); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
            return count > 0;
        });
    };
    Posts.endorse = function (pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield toggleEndorse('endorse', pid, uid);
        });
    };
    Posts.unendorse = function (pid, uid) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield toggleEndorse('unendorse', pid, uid);
        });
    };
}
exports.default = default_1;
