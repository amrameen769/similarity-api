'use client'

import { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs'
import SimpleBar from 'simplebar-react'
import Code from './Code'
import { nodejs, python } from '@/contants/documentation-code'

import 'simplebar-react/dist/simplebar.min.css'

const DocumentationTabs: FC = ({ }) => {
  
  return <Tabs defaultValue='nodejs' className='max-w-2xl w-full'>
    <TabsList>
      <TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
      <TabsTrigger value='python'>Python</TabsTrigger>
    </TabsList>
    <TabsContent value='nodejs'>
      <SimpleBar>
        <Code animated code={nodejs} show language={'javascript'} />
      </SimpleBar>
    </TabsContent>
    <TabsContent value='python'>
      <SimpleBar>
        <Code animated code={python} show language={'python'} />
      </SimpleBar>

    </TabsContent>
  </Tabs>
}

export default DocumentationTabs