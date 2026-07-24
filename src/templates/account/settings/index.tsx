import { DangerZone } from "./components/danger-zone"
import { SwitchThemeCard } from "./components/switch-theme-card"
import { UpdatePassword } from "./components/update-password"
import { UpdateProfileInfo } from "./components/update-profile-info"

function SettingsPage() {
  return (
    <div className="grid md:grid-cols-2 md:grid-rows-[auto_174px] gap-4">
      <UpdateProfileInfo/>
      <UpdatePassword />
      <SwitchThemeCard />
      <DangerZone/>
    </div>
  )
}

export { SettingsPage }
