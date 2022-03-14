#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

console.log('run webpack')
const CONFIG_NAME = '.cjrc.js'

const configPath = path.resolve('./' + CONFIG_NAME)

const existConfig = fs.existsSync(configPath)
if (!existConfig) throw new Error(CONFIG_NAME + ' is required')

require(configPath)
