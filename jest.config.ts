
import type { Config } from '@jest/types'
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest', // For JavaScript files

    
  },
}

export default config