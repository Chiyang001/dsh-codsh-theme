$ErrorActionPreference = 'Stop'
$taskElectronPath = Join-Path $env:LOCALAPPDATA 'Programs\DeepSeek Harness\DeepSeek Harness.exe'
if (-not (Test-Path -LiteralPath $taskElectronPath)) { throw 'DeepSeek Harness Desktop is not installed at its default path.' }
$taskPreviousNodeMode = $env:ELECTRON_RUN_AS_NODE
try {
  $env:ELECTRON_RUN_AS_NODE = '1'
  $taskOutputDirectory = Join-Path $PSScriptRoot '..\artifacts'
  New-Item -ItemType Directory -Path $taskOutputDirectory -Force | Out-Null
  $taskOut = Join-Path $taskOutputDirectory 'runtime.stdout.log'
  $taskErr = Join-Path $taskOutputDirectory 'runtime.stderr.log'
  $taskTestPath = (Resolve-Path -LiteralPath (Join-Path $PSScriptRoot '..\tests\desktop-runtime.mjs')).Path
  $taskProcess = Start-Process -FilePath $taskElectronPath -ArgumentList @('--expose-internals', ('"' + $taskTestPath + '"')) -WindowStyle Hidden -Wait -PassThru -RedirectStandardOutput $taskOut -RedirectStandardError $taskErr
  Get-Content -LiteralPath $taskOut
  Get-Content -LiteralPath $taskErr
  if ($taskProcess.ExitCode -ne 0) { throw "Desktop runtime verification failed: $($taskProcess.ExitCode)" }
} finally { $env:ELECTRON_RUN_AS_NODE = $taskPreviousNodeMode }
