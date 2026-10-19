'use client';

import { Switch } from "@chakra-ui/react";
import { useState } from "react";

export default function ChangeLanguage() {
    
const [checked, setChecked] = useState(false)

  return (
    <div id="change-language">
        <Switch.Root
        checked={checked}
        onCheckedChange={(e) => setChecked(e.checked)}
        >
        <Switch.HiddenInput />
        <Switch.Control>
            <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>{checked ? 'EN' : 'JP'}</Switch.Label>
        </Switch.Root>
    </div>
  )
}