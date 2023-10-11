import db = require('../database');
import plugins = require('../plugins');

interface PostData {
  pid: number,
  uid: number
}

interface ToggleData {
  post: PostData,
  isEndorsed: boolean
}

interface PostsType {
  getPostFields(pid: string, fields: string[]): Promise<PostData>,
  hasEndorsed(pid: string | Array<string>, uid: string): Promise<boolean | boolean[]>
  endorse(pid: string, uid: string): Promise<ToggleData>,
  unendorse(pid: string, uid: string): Promise<ToggleData>,
}

export default function (Posts: PostsType) {
    async function toggleEndorse(type: string, pid: string, uid: string) {
        if (parseInt(uid, 10) <= 0) {
            throw new Error('[[error:not-logged-in]]');
        }

        const isEndorsing = type === 'endorse';

        const [postData, hasEndorsed] = await Promise.all([
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
            await db.sortedSetAdd(`uid:${uid}:endorsed`, Date.now(), pid);
        } else {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            await db.sortedSetRemove(`uid:${uid}:endorsed`, pid);
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        await db[isEndorsing ? 'setAdd' : 'setRemove'](`pid:${pid}:users_endorsed`, uid);

        await plugins.hooks.fire(`action:post.${type}`, {
            pid: pid,
            uid: uid,
            owner: postData.uid,
            current: isEndorsing ? 'endorsed' : 'unendorsed',
        });

        return {
            post: postData,
            isEndorsed: isEndorsing,
        };
    }

    Posts.hasEndorsed = async function (pid: string | Array<string>, uid: string) {
        if (parseInt(uid, 10) <= 0) {
            return Array.isArray(pid) ? pid.map(() => false) : false;
        }

        if (Array.isArray(pid)) {
            const sets = pid.map(pid => `pid:${pid}:users_endorsed`);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            const counts = await db.setsCount(sets); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
            // The next line calls a function in a module that has not been updated to TS yet
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
            return counts.map(v => v > 0); // eslint-disable-line @typescript-eslint/no-unsafe-call
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        const count = await db.setCount(`pid:${pid}:users_endorsed`); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
        return count > 0;
    };

    Posts.endorse = async function (pid: string, uid: string) {
        return await toggleEndorse('endorse', pid, uid);
    };

    Posts.unendorse = async function (pid: string, uid: string) {
        return await toggleEndorse('unendorse', pid, uid);
    };
}
