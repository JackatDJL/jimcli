#! /usr/bin/env node

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import process from 'process';
import { execSync } from 'child_process';
import { mind } from 'gradient-string';
import chalk from 'chalk';
import ora from 'ora';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';

const packageJsonPath = join(process.cwd(), 'package.json');

type ErrorCode = 'e0010' | 'e0011';

type PackageManagerTypes = ErrorCode | 'npm' | 'yarn' | 'pnpm';

function determinePackageManager(): PackageManagerTypes {
    if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        if (packageJson.lockfileVersion) {
            return 'npm';
        } else if (existsSync(join(process.cwd(), 'yarn.lock'))) {
            return 'yarn';
        } else if (existsSync(join(process.cwd(), 'pnpm-lock.yaml'))) {
            return 'pnpm';
        }
    } else {
        return 'e0010';
    }
    return 'e0011'; // Default case if none of the conditions match
}

function getWhoAmICommand(packageManager: string): string {
    if (packageManager === 'yarn') {
        const yarnVersion = execSync('yarn --version').toString().trim();
        const majorVersion = yarnVersion.split('.')[0];
        if (majorVersion && parseInt(majorVersion, 10) >= 2) {
            return 'yarn npm whoami';
        } else {
            return 'yarn whoami';
        }
    } else if (packageManager === 'npm') {
        return 'npm whoami';
    } else {
        throw new Error('Unsupported package manager');
    }
}

function determineUsername(packageManager: PackageManagerTypes): string {
    try {
        const whoAmICommand = getWhoAmICommand(packageManager);
        const output = execSync(whoAmICommand).toString().trim();
        switch (packageManager) {
            case 'npm':
                return output;
            case 'yarn':
                return output.split('\n').find(line => line.startsWith('➤ YN0000:'))?.replace('➤ YN0000: ', '') || 'User';
            case 'pnpm':
                return output;
            default:
                throw new Error('Unsupported package manager');
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Failed to determine user: ${error.message}`);
        } else {
            console.error('Failed to determine user: Unknown error');
        }
        return 'User';
    }
}

async function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const arr: string = chalk.cyan(chalk.bold('>> '));


    console.log(arr, "jim ", process.argv.slice(2));
    const startJIM = ora('...').start();
    startJIM.info('Need to start JIM');
    await sleep(200);
    startJIM.start('Starting JIM');
    const packageManager = await determinePackageManager();
    const username = await determineUsername(packageManager);
    figlet('JIM', (err, data) => {
        if (err) {
            console.error('Error generating ASCII art:', err);
            return;
        }
        if (data) {
            console.log(gradient.pastel.multiline(data));
        } else {
            console.error('No data received for ASCII art');
        }
    });

    startJIM.succeed('JIM running');
    await sleep(200);
    const jacksinstalationmanadger = chalkAnimation.radar('Jacks instalation manager');
    jacksinstalationmanadger.start();
    console.log(arr,mind(`Hello, ${username}!`));
    await sleep(2000);
    jacksinstalationmanadger.stop();